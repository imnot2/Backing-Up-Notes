/* global ymtapp: true*/
/* jshint strict: false,latedef:nofunc */
/*
	全球热栏目数据脚本
*/
ymtapp.controller('HotController', [
	'$scope',
	'httpHandlService',
	'$window',
	'hotProduct',
	'utils',
	'shareUrl',
	'searchCategory',
	'ProductService',
	function ($scope, $http, $window, hotProduct, utils, shareUrl, searchCategory,ProductService) {
		//热卖分类
		$scope.categoryOpts = {
			'freeMode': true,
			'freeModeFluid': true,
			'slidesPerView': 4.6,
			'onReady': function (swiper) {
				setTimeout(function () {
					//@FUCK 居然没有执行回调
					swiper.swipeTo(swiper.slides.length - 1, 8E2);
					setTimeout(function () {
						swiper.swipeTo(0, 8E2);
					}, 8E2);
				}, 8E2);
			}
		};
		//替换图片
		$scope.getPicUrl = function (url) {
			return utils.imgHandl.replaceToListPic(url, ['_o', '_m'], '_l');
		};

		searchCategory.toSearch = function (val) {
			$scope.hotProducts.page = 1;
			$scope.hotProducts.noDate = false;
			$scope.hotProducts.keyword = val;
			$scope.hotProducts.items = [];
			this.searchKeyword = val;
			var that = this;
			$scope.hotProducts.nextPage(function () {
				that.isSearchOver = true;
				that.searchNumber = $scope.hotProducts.items.length;
			});
		};
		searchCategory.reduction = function () {
			$scope.selectTab($scope.hotProducts.tabId);
		};
		$scope.search = searchCategory; //new SearchClass();

		$scope.lowerCategoryLists = {
			7: [{
				id: '1465',
				name: '尿裤纸巾',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/d06969e4e5c545629ee9bb4a0456cb68.png'
			}, {
				id: '1269',
				name: '大牌奶粉',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/461f9ef6285845e28d73908e6f1cb313.png'
			}, {
				id: '1296',
				name: '清洁洗护',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/a73d9e32710a4f248acbe6409b0821e8.png'
			}, {
				id: '1278',
				name: '婴儿辅食',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/2e61ca85273e463f89024c28437571ec.png'
			}, {
				id: '1376',
				name: '母婴保健',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/6f91bac6aae44abab358af42d88dc0cf.png'
			}, {
				id: '1373,1385',
				name: '宝宝用品',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/8716e6b302fe41aab3827c3702538f42.png'
			}, {
				id: '1288',
				name: '哺育喂养',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/1e73fe5c5a1b4296b55f33db20584ad7.png'
			}, {
				id: '1389',
				name: '宝宝玩具',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/683e0ced84dd43c593ce36f7f921b6c3.png'
			}],
			9: [{
				id: '1238',
				name: '休闲零食',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/ef0a13562f584b49aaaf49af167fc288.png'
			}, {
				id: '1237',
				name: '糖果巧克力',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/3e513a24ef684a60abe113dc5980a959.png'
			}, {
				id: '1236',
				name: '坚果蜜饯',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/eee65c4993f542dbbeb912c4e158961b.png'
			}, {
				id: '1234',
				name: '饼干糕点',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/6195b66afacb484dbd7c4436b8e67a7b.png'
			}, {
				id: '1239,1242,1235',
				name: '咖啡冲调',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/12cb9c8e12ff45fe9eb3fba051e6d03a.png'
			}, {
				id: '1245,1243,1240',
				name: '酒水饮料',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/8982c06a4953440e9165c958a50426ea.png'
			}, {
				id: '1241,1454',
				name: '粮油调味',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/d50a4483ce6e4e77920dd19f00af1bb8.png'
			}, {
				id: '1244',
				name: '其他',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/7637e435f547495e8c63d57a86f1142d.png'
			}],
			10: [{
				id: '1253,1254,1255,1256,1261,1510',
				name: '基础营养',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/85cea35ef2704c3382d12e8ca8955b51.png'
			}, {
				id: '1262,1393,1501,1502,1257,1503',
				name: '魅力女性',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/830892d780d64349b0a2ad8822dc93df.png'
			}, {
				id: '1509,1507',
				name: '男性养护',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/b1e485d058c9454bbbee99d06d6b26dd.png'
			}, {
				id: '1260,1264,1265,1266,1455,1504',
				name: '老年关爱',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/f39d88d07e364a5dba8db22171effe14.png'
			}],
			11: [ //时尚教主
				{
					id: '1178',
					name: '潮流女包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a493f269a150493fa860ec22953f09fa.png'
				}, {
					id: '1314',
					name: '男装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5882b8b527bb4e92be52d057219d7a08.png'
				}, {
					id: '1426',
					name: '女鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5f513770a820438ab03a862634780e8c.png'
				}, {
					id: '1185',
					name: '时尚男包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/cbac5ed041bf4df3969a637c28c1e2de.png'
				}, {
					id: '1351,1213,1208,1204,1217,1225',
					name: '配饰',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/276b28aabe91401ab8dbb6c9f93ea3e8.png'
				}, {
					id: '1344',
					name: '内衣袜品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/9c5709a4392d46798fb6a033e1c24dbe.png'
				}, {
					id: '1327',
					name: '女装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/d3fef3de84d94834ac42556ab76eff3e.png'
				}, {
					id: '1420',
					name: '男鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a877ec8e376c4114a4e7a8b658c8d9a2.png'
				}
			],
			8: [ //美妆达人
				{
					id: '1087',
					name: '面部护肤',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/fb10e1380d034bc49c7c742782281079.png'
				}, {
					id: '1102',
					name: '护发美体',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/3650edff4d1a4bff8783a89d8e1e27f8.png'
				}, {
					id: '1130',
					name: '香水彩妆',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5139fb76b0a74d549625b2d32e39bdaf.png'
				}, {
					id: '1120',
					name: '女性护理',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/dec92de48d9048bdb01050d7d8b05de8.png'
				}
			],
			13: [ //居家日用
				{
					id: '1056',
					name: '个人护理',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/f2c6fdb21d0a413bbf1de13fdf7f09d2.png'
				}, {
					id: '1054',
					name: '厨房电器',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/7ff7df58063d4dadaf9929992fa81b1f.png'
				}, {
					id: '1052',
					name: '生活电器',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/1330c9c6a6ce4ab7b3ea85253f315eb0.png'
				}, {
					id: '1083',
					name: '厨房用具',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/79e0754ebbe7401eb93214b8ac35b94b.png'
				}, {
					id: '1077,1073,1466',
					name: '生活日用',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/0237f9f7b67c4bdc8fb399488cff0a04.png'
				}, {
					id: '1079',
					name: '清洁用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/6ffd2de1598848ac9f16669e2b2ea79b.png'
				}, {
					id: '1081',
					name: '宠物用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/6a189f9c855a4a6ab61760098cd7ddf5.png'
				}, {
					id: '1174',
					name: '文具礼品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/51a7b6d6552a43d3a57d34b91d127d72.png'
				}
			],
			12: [ //运动户外
				{
					id: '1783',
					name: '运动鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a46922b0137444e5b0d0ff5a6290db62.png'
				}, {
					id: '1700',
					name: '户外用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/48537a522bb144fa98f8f738029d17ec.png'
				}, {
					id: '1707',
					name: '户外服装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/fb374ec4eb9042efa97627ec28bebd54.png'
				}, {
					id: '1708',
					name: '户外鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/39066b137c4344a59a5b8ac9c201f79d.png'
				}, {
					id: '1769',
					name: '运动服饰',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/ac5ed51e43494af6b6e1a8ff4cb57bf8.png'
				}, {
					id: '1749',
					name: '户外包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/05f1a2578e5e41c6aaa57b3af905ed2f.png'
				}, {
					id: '1717',
					name: '健身器材',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/83f9d01691be427096c42f48e9fb5399.png'
				}, {
					id: '1795,1701',
					name: '其他',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/7637e435f547495e8c63d57a86f1142d.png'
				}
			]
		};
		$scope.lowerCategoryLists = {
			7: [{
				id: '1465',
				name: '尿裤纸巾',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/d06969e4e5c545629ee9bb4a0456cb68.png'
			}, {
				id: '1269',
				name: '大牌奶粉',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/461f9ef6285845e28d73908e6f1cb313.png'
			}, {
				id: '1296',
				name: '清洁洗护',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/a73d9e32710a4f248acbe6409b0821e8.png'
			}, {
				id: '1278',
				name: '婴儿辅食',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/2e61ca85273e463f89024c28437571ec.png'
			}, {
				id: '1376',
				name: '母婴保健',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/6f91bac6aae44abab358af42d88dc0cf.png'
			}, {
				id: '1373,1385',
				name: '宝宝用品',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/8716e6b302fe41aab3827c3702538f42.png'
			}, {
				id: '1288',
				name: '哺育喂养',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/1e73fe5c5a1b4296b55f33db20584ad7.png'
			}, {
				id: '1389',
				name: '宝宝玩具',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/683e0ced84dd43c593ce36f7f921b6c3.png'
			}],
			9: [{
				id: '1238',
				name: '休闲零食',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/ef0a13562f584b49aaaf49af167fc288.png'
			}, {
				id: '1237',
				name: '糖果巧克力',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/3e513a24ef684a60abe113dc5980a959.png'
			}, {
				id: '1236',
				name: '坚果蜜饯',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/eee65c4993f542dbbeb912c4e158961b.png'
			}, {
				id: '1234',
				name: '饼干糕点',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/6195b66afacb484dbd7c4436b8e67a7b.png'
			}, {
				id: '1239,1242,1235',
				name: '咖啡冲调',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/12cb9c8e12ff45fe9eb3fba051e6d03a.png'
			}, {
				id: '1245,1243,1240',
				name: '酒水饮料',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/8982c06a4953440e9165c958a50426ea.png'
			}, {
				id: '1241,1454',
				name: '粮油调味',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/d50a4483ce6e4e77920dd19f00af1bb8.png'
			}, {
				id: '1244',
				name: '其他',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/7637e435f547495e8c63d57a86f1142d.png'
			}],
			10: [{
				id: '1253,1254,1255,1256,1261,1510',
				name: '基础营养',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/85cea35ef2704c3382d12e8ca8955b51.png'
			}, {
				id: '1262,1393,1501,1502,1257,1503',
				name: '魅力女性',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/830892d780d64349b0a2ad8822dc93df.png'
			}, {
				id: '1509,1507',
				name: '男性养护',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/b1e485d058c9454bbbee99d06d6b26dd.png'
			}, {
				id: '1260,1264,1265,1266,1455,1504',
				name: '老年关爱',
				img: 'http://p5.img.ymatou.com/upload/staticcontent/f39d88d07e364a5dba8db22171effe14.png'
			}],
			11: [ //时尚教主
				{
					id: '1178',
					name: '潮流女包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a493f269a150493fa860ec22953f09fa.png'
				}, {
					id: '1314',
					name: '男装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5882b8b527bb4e92be52d057219d7a08.png'
				}, {
					id: '1426',
					name: '女鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5f513770a820438ab03a862634780e8c.png'
				}, {
					id: '1185',
					name: '时尚男包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/cbac5ed041bf4df3969a637c28c1e2de.png'
				}, {
					id: '1351,1213,1208,1204,1217,1225',
					name: '配饰',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/276b28aabe91401ab8dbb6c9f93ea3e8.png'
				}, {
					id: '1344',
					name: '内衣袜品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/9c5709a4392d46798fb6a033e1c24dbe.png'
				}, {
					id: '1327',
					name: '女装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/d3fef3de84d94834ac42556ab76eff3e.png'
				}, {
					id: '1420',
					name: '男鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a877ec8e376c4114a4e7a8b658c8d9a2.png'
				}
			],
			8: [ //美妆达人
				{
					id: '1087',
					name: '面部护肤',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/fb10e1380d034bc49c7c742782281079.png'
				}, {
					id: '1102',
					name: '护发美体',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/3650edff4d1a4bff8783a89d8e1e27f8.png'
				}, {
					id: '1130',
					name: '香水彩妆',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/5139fb76b0a74d549625b2d32e39bdaf.png'
				}, {
					id: '1120',
					name: '女性护理',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/dec92de48d9048bdb01050d7d8b05de8.png'
				}
			],
			13: [ //居家日用
				{
					id: '1056',
					name: '个人护理',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/f2c6fdb21d0a413bbf1de13fdf7f09d2.png'
				}, {
					id: '1054',
					name: '厨房电器',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/7ff7df58063d4dadaf9929992fa81b1f.png'
				}, {
					id: '1052',
					name: '生活电器',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/1330c9c6a6ce4ab7b3ea85253f315eb0.png'
				}, {
					id: '1083',
					name: '厨房用具',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/79e0754ebbe7401eb93214b8ac35b94b.png'
				}, {
					id: '1077,1073,1466',
					name: '生活日用',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/0237f9f7b67c4bdc8fb399488cff0a04.png'
				}, {
					id: '1079',
					name: '清洁用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/6ffd2de1598848ac9f16669e2b2ea79b.png'
				}, {
					id: '1081',
					name: '宠物用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/6a189f9c855a4a6ab61760098cd7ddf5.png'
				}, {
					id: '1174',
					name: '文具礼品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/51a7b6d6552a43d3a57d34b91d127d72.png'
				}
			],
			12: [ //运动户外
				{
					id: '1783',
					name: '运动鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/a46922b0137444e5b0d0ff5a6290db62.png'
				}, {
					id: '1700',
					name: '户外用品',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/48537a522bb144fa98f8f738029d17ec.png'
				}, {
					id: '1707',
					name: '户外服装',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/fb374ec4eb9042efa97627ec28bebd54.png'
				}, {
					id: '1708',
					name: '户外鞋',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/39066b137c4344a59a5b8ac9c201f79d.png'
				}, {
					id: '1769',
					name: '运动服饰',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/ac5ed51e43494af6b6e1a8ff4cb57bf8.png'
				}, {
					id: '1749',
					name: '户外包',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/05f1a2578e5e41c6aaa57b3af905ed2f.png'
				}, {
					id: '1717',
					name: '健身器材',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/83f9d01691be427096c42f48e9fb5399.png'
				}, {
					id: '1795,1701',
					name: '其他',
					img: 'http://p5.img.ymatou.com/upload/staticcontent/7637e435f547495e8c63d57a86f1142d.png'
				}
			]
		};

		$scope.lowerCategorys = [];

		$scope.selectLowerCategory = function (type) {
			$scope.lowerCategorys = $scope.lowerCategoryLists[type];
		};

		//默认全球热
		$scope.hotProducts = new hotProduct();

		$scope.selectCategory = function (cid) {
			$scope.selectTab($scope.hotProducts.tabId, null, cid);
		};

		$scope.selectTab = function (tid, keyword, cid) {
			$scope.hotProducts = new hotProduct();
			$scope.hotProducts.tabId = tid || 0;
			$scope.hotProducts.category = cid || '';
			$scope.hotProducts.page = 1;
			$scope.hotProducts.noDate = false;

			$scope.hotProducts.keyword = keyword;

			$scope.hotProducts.nextPage();
			$scope.hotProducts.items = [];

			$scope.search.isShowDefault = false;
			$scope.search.isShowSearch = false;
			$scope.search.isSearchOver = false;

			!cid && $scope.selectLowerCategory(tid);
		};

		$scope.escape = function (html) {
			return utils.common.sanitize(html);
		};

		$scope.toProduct = ProductService.toProduct;
	}
]);