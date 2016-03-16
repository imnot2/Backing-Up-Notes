/* global ymtapp: true,prompt:true,angular:true*/
/* jshint strict: false,latedef:nofunc */
/*
	Shopping Bag Controller
	by xiaokang 
	date 2014/9/1
*/
ymtapp.controller('ShoppingBagController', [
	'$scope',
	'httpHandlService',
	'utils',
	'$document',
	'YmtApi',
	'$window',
	function ($scope, $http, utils, $document,YmtApi,$window) {
		/**
		 * 购物车价格变更
		 */
		var shoppingcartChange = function (result) {
			$scope.shoppingcart.TotalPrice = result.TotalPrice;
			$scope.shoppingcart.TotalFeight = result.TotalFreight;
		}

		$scope.bonded = 0;
		//获得购物车信息
		var url = '/forYmatouApp/shoppingCart/';
		$http.get(url).success(function (data) {
			$scope.shoppingcart = data;
		})

		/**
		 * 选择单个商品
		 */
		$scope.productSelect = function (sellerId, pindex, ShoppingCartId) {
			var pid, sellerProducts = $scope.shoppingcart.ShoppingCartInfo.SellerProducts;
			for (var s in sellerProducts) {
				if (sellerProducts[s].SellerId == sellerId) {
					sellerProducts[s].Catalogs[pindex].Selected = !sellerProducts[s].Catalogs[pindex].Selected
					pid = sellerProducts[s];
				}
			}

			var data = {
				SellerId: pid.SellerId,
				CartId: pid.Catalogs[pindex].CartId,
				Selected: pid.Catalogs[pindex].Selected,
				ShoppingCartId: ShoppingCartId
			}

			$http.post('/api/changeCatalogSelected', data).success(function (result, code) {
				if (code == 200) {
					shoppingcartChange(result);
				}
			})

		}

		/**
		 * 变更全选状态
		 * @param  {object} paramData
		 *         				UserId
		 *         				Selected
		 *         				ShoppingCartId
		 *         				SellerId 通过是否传递sellerId判断是否为卖家全选
		 */
		var changeAllSelectedStatus = function (paramData) {
			$http.post('/api/changeAllSelected', paramData).success(function (result, code) {
				if (code == 200)
					shoppingcartChange(result);
			});
		};
		/**
		 * 全选
		 */
		$scope.allSelect = function (ShoppingCartId) {
			$scope.shoppingcart.SelectedAll = !$scope.shoppingcart.SelectedAll;
			var data = {
				Selected: $scope.shoppingcart.SelectedAll,
				ShoppingCartId: ShoppingCartId
			}
			var sSelectd = $scope.shoppingcart.ShoppingCartInfo.SellerProducts

			for (var s in sSelectd) {
				sSelectd[s].Selected = data.Selected;
				for (var sp in sSelectd[s].Catalogs) {
					sSelectd[s].Catalogs[sp].Selected = data.Selected;
				}
			}
			changeAllSelectedStatus(data);
		};
		//选中卖家
		$scope.sellerSelectd = function (index, ShoppingCartId) {
			var sellerProduct = $scope.shoppingcart.ShoppingCartInfo.SellerProducts[index];
			sellerProduct.Selected = !sellerProduct.Selected;

			for (var p in sellerProduct.Catalogs) {
				sellerProduct.Catalogs[p].Selected = sellerProduct.Selected;
			}

			//接口更新
			var data = {
				SellerId: sellerProduct.SellerId,
				Selected: sellerProduct.Selected,
				ShoppingCartId: ShoppingCartId
			}

			changeAllSelectedStatus(data);
		}

		$scope.delProduct = function (seller, catalogid, pindex, ShoppingCartId, CartId) {
			var s, data = {
				SellerId: seller,
				CatalogId: catalogid,
				ShoppingCartId: ShoppingCartId,
				CartIds: [CartId]
			}
			confirmBox("是否删除此商品？", function () {
				for (var s in $scope.shoppingcart.ShoppingCartInfo.SellerProducts) {
					if ($scope.shoppingcart.ShoppingCartInfo.SellerProducts[s].SellerId == seller) {
						if ($scope.shoppingcart.ShoppingCartInfo.SellerProducts[s].Catalogs.length < 2) {
							$scope.shoppingcart.ShoppingCartInfo.SellerProducts.splice(s, 1);
						}
						else {
							$scope.shoppingcart.ShoppingCartInfo.SellerProducts[s].Catalogs.splice(pindex, 1);
						}
					}
				}
				$http.post('/api/delshoppingcart', data).success(function (result, code) {
					if (code == 200) {
						shoppingcartChange(result);
						$scope.shoppingcart.ItemCount--;
					}
				})
			})
		}
		//购物车和卖家聊天
		$scope.toChat = function (toid, toLoginId, toLogoUrl) {
			$http.get('/forYmatouApp/personal/isLogin').success(function (result,code) {
				if(code == 200){
					YmtApi.openChatDetail({
						SessionId:result.UserId + '_' + toid,
						ToId:toid,
						ToLoginId:toLoginId,
						ToLogoUrl:toLogoUrl
					});
				}				
			});
		}
		var isLogin = true;
		$scope.toOrder = function () {
			//存在一次用户状态变更 就需要重新加载
			if(!isLogin){
				prompt('购物袋有更新，刷新之后请重新确认结算');
				setTimeout(function(){
					$window.location.reload();
				},2E2)
				return;
			}
			if ($scope.shoppingcart.TotalPrice <= 0) {
				var products = $scope.shoppingcart.ShoppingCartInfo.SellerProducts;
				if(!products ||	(products && products.length === 0)){
					prompt('购物车为空！');
				}else{
					prompt('至少选择一件商品去结算');
				}
				return false;
			}
			isLogin = false;
			$http.get('/forYmatouApp/personal/isLogin').success(function (result, code) {
				if (code == 200) {
					isLogin = true;
					YmtApi.open({
						url:'/forYmatouApp/orders',
						title:'确认订单',
						isNew:true
					});
				}
			});
		};
		//@TODO 这个放和商品是重复的 后面考虑提出了
		/*
		 * 数量增减的方法
		 * @param {numer or boolean}1 ++ 0 --
		 */
		$scope.incOrDec = function (param, obj, SellerId) {
			var factor = param ? 1 : -1;
			var num = obj.ProductNumber || 1,
				isLimit = obj.HasRestriction,
				limit = obj.RestrictionNum,
				ProductNumber = 0;

			if (param) {
				if (isLimit && num >= limit) {
					prompt("购买商品不得多余于" + limit + "件")
					return false;
				}
			}
			else {
				if (num < 2) {
					prompt("购买商品不得少于一件")
					return false;
				}
			}
			ProductNumber = parseInt(obj.ProductNumber, 10) + factor;
			$http.post('/api/changeCatalogNum', {
				ShoppingCartId: $scope.shoppingcart.ShoppingCartId,
				CartId: obj.CartId,
				CatalogNum: ProductNumber
			}).success(function (result, code) {
				if (code == 200) {
					shoppingcartChange(result);
					obj.ProductNumber = parseInt(obj.ProductNumber, 10) + factor;
				}
			})
		}

	}
])