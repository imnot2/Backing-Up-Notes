define(function(require,exports,module){
    /**c2c尺寸对照表**/
    exports.sizeRefs = [
        '<!--衬衫尺寸对照表-->\n' +
        '<div class="size-ref-tab-con">\n' +
        '    <span class="size-ref-tab-title">男 装（衬衫）尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <caption>男 装（衬衫）</caption>\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标准</th>\n' +
        '                <th> 国际</th>\n' +
        '                <th> 欧洲</th>\n' +
        '                <th> 美国</th>\n' +
        '                <th> 韩国</th>\n' +
        '                <th> 中 国\n' +
        '                    <br> (领围)</th>\n' +
        '                <th> 号型</th>\n' +
        '                <th> 袖长\n' +
        '                    <br> （长袖cm）</th>\n' +
        '                <th> 袖长\n' +
        '                    <br> （短袖cm）</th>\n' +
        '                <th> 胸 围\n' +
        '                    <br> （cm）</th>\n' +
        '                <th> 肩宽\n' +
        '                    <br> （cm）</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="9"> <span class="f12">尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td> S</td>\n' +
        '                <td> 37</td>\n' +
        '                <td> 14.5</td>\n' +
        '                <td> 90~95</td>\n' +
        '                <td> 37</td>\n' +
        '                <td> 165/80</td>\n' +
        '                <td> 59.5</td>\n' +
        '                <td> 23.5</td>\n' +
        '                <td> 102</td>\n' +
        '                <td> 45</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="2"> M</td>\n' +
        '                <td rowspan="2"> 38</td>\n' +
        '                <td rowspan="2"> 15</td>\n' +
        '                <td rowspan="2"> 95~100</td>\n' +
        '                <td> 38</td>\n' +
        '                <td> 170/84</td>\n' +
        '                <td> 61</td>\n' +
        '                <td> 24.5</td>\n' +
        '                <td> 106</td>\n' +
        '                <td> 46.2</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 39</td>\n' +
        '                <td> 170/88</td>\n' +
        '                <td> 61</td>\n' +
        '                <td> 24.5</td>\n' +
        '                <td> 110</td>\n' +
        '                <td> 47.4</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="3"> L</td>\n' +
        '                <td rowspan="3"> 39</td>\n' +
        '                <td rowspan="3"> 15.5</td>\n' +
        '                <td rowspan="3"> 100~105</td>\n' +
        '                <td> 40</td>\n' +
        '                <td> 175/92</td>\n' +
        '                <td> 62.5</td>\n' +
        '                <td> 25.5</td>\n' +
        '                <td> 114</td>\n' +
        '                <td> 48.6</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 41</td>\n' +
        '                <td> 175/96</td>\n' +
        '                <td> 62.5</td>\n' +
        '                <td> 25.5</td>\n' +
        '                <td> 118</td>\n' +
        '                <td> 49.8</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 42</td>\n' +
        '                <td> 180/100</td>\n' +
        '                <td> 64</td>\n' +
        '                <td> 26.5</td>\n' +
        '                <td> 122</td>\n' +
        '                <td> 51</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="2"> XL</td>\n' +
        '                <td rowspan="2"> 40</td>\n' +
        '                <td rowspan="2"> 16</td>\n' +
        '                <td rowspan="2"> 105~110</td>\n' +
        '                <td> 43</td>\n' +
        '                <td> 180/104</td>\n' +
        '                <td> 64</td>\n' +
        '                <td> 26.5</td>\n' +
        '                <td> 126</td>\n' +
        '                <td> 52.2</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 44</td>\n' +
        '                <td> 185/108</td>\n' +
        '                <td> 65.5</td>\n' +
        '                <td> 27.5</td>\n' +
        '                <td> 130</td>\n' +
        '                <td> 53.4</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXL</td>\n' +
        '                <td> 41</td>\n' +
        '                <td> 16.5</td>\n' +
        '                <td> &gt;110</td>\n' +
        '                <td> 45</td>\n' +
        '                <td> 185/112</td>\n' +
        '                <td> 65.5</td>\n' +
        '                <td> 27.5</td>\n' +
        '                <td> 134</td>\n' +
        '                <td> 54.6</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>\n',
        '<!--文胸对照表-->\n' +
        '<div class="size-ref-tab-con">\n' +
        '    <span class="size-ref-tab-title">内衣-女士文胸对照表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 下胸围</th>\n' +
        '                <th> 上胸 围</th>\n' +
        '                <th> 韩 国</th>\n' +
        '                <th> 美 国</th>\n' +
        '                <th> 允 许范围</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 65</td>\n' +
        '                <td> 70~73</td>\n' +
        '                <td> 65A</td>\n' +
        '                <td> 30AA</td>\n' +
        '                <td rowspan="5"> 63CM~68CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 74~76</td>\n' +
        '                <td> 65B</td>\n' +
        '                <td> 30A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 77~79</td>\n' +
        '                <td> 65C</td>\n' +
        '                <td> 30B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 79~81</td>\n' +
        '                <td> 65D</td>\n' +
        '                <td> 30C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 81~83</td>\n' +
        '                <td> 65DD</td>\n' +
        '                <td> 30D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 70</td>\n' +
        '                <td> 79~81</td>\n' +
        '                <td> 70A</td>\n' +
        '                <td> 32AA</td>\n' +
        '                <td rowspan="5"> 68CM~73CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 82~84</td>\n' +
        '                <td> 70B</td>\n' +
        '                <td> 32A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 84~86</td>\n' +
        '                <td> 70C</td>\n' +
        '                <td> 32B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 86~88</td>\n' +
        '                <td> 70D</td>\n' +
        '                <td> 32C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 89~91</td>\n' +
        '                <td> 70DD</td>\n' +
        '                <td> 32D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 75</td>\n' +
        '                <td> 83~86</td>\n' +
        '                <td> 75A</td>\n' +
        '                <td> 34AA</td>\n' +
        '                <td rowspan="5"> 73CM~78CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 87~89</td>\n' +
        '                <td> 75B</td>\n' +
        '                <td> 34A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 89~91</td>\n' +
        '                <td> 75C</td>\n' +
        '                <td> 34B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 91~93</td>\n' +
        '                <td> 75D</td>\n' +
        '                <td> 34C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 93~95</td>\n' +
        '                <td> 75DD</td>\n' +
        '                <td> 34D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 80</td>\n' +
        '                <td> 89~91</td>\n' +
        '                <td> 80A</td>\n' +
        '                <td> 36AA</td>\n' +
        '                <td rowspan="5"> 78CM~83CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 92~94</td>\n' +
        '                <td> 80B</td>\n' +
        '                <td> 36A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 94~96</td>\n' +
        '                <td> 80C</td>\n' +
        '                <td> 36B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 96~98</td>\n' +
        '                <td> 80D</td>\n' +
        '                <td> 36C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 98~100</td>\n' +
        '                <td> 80DD</td>\n' +
        '                <td> 36D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 85</td>\n' +
        '                <td> 94~96</td>\n' +
        '                <td> 85A</td>\n' +
        '                <td> 38AA</td>\n' +
        '                <td rowspan="5"> 83CM~88CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 97~99</td>\n' +
        '                <td> 85B</td>\n' +
        '                <td> 38A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 99~101</td>\n' +
        '                <td> 85C</td>\n' +
        '                <td> 38B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 101~103</td>\n' +
        '                <td> 85D</td>\n' +
        '                <td> 38C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 103~105</td>\n' +
        '                <td> 85DD</td>\n' +
        '                <td> 38D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="5"> 90</td>\n' +
        '                <td> 99~101</td>\n' +
        '                <td> 90A</td>\n' +
        '                <td> 40AA</td>\n' +
        '                <td rowspan="5"> 88CM~93CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 102~104</td>\n' +
        '                <td> 90B</td>\n' +
        '                <td> 40A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 104~106</td>\n' +
        '                <td> 90C</td>\n' +
        '                <td> 40B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 106~108</td>\n' +
        '                <td> 90D</td>\n' +
        '                <td> 40C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 108~110</td>\n' +
        '                <td> 90DD</td>\n' +
        '                <td> 40D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 95</td>\n' +
        '                <td> —</td>\n' +
        '                <td> —</td>\n' +
        '                <td> —</td>\n' +
        '                <td> 93CM~98CM</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 100</td>\n' +
        '                <td> —</td>\n' +
        '                <td> —</td>\n' +
        '                <td> —</td>\n' +
        '                <td> 98CM~103CM</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">胸罩罩杯尺寸说明表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 罩杯型号</th>\n' +
        '                <th colspan="2"> 胸围与胸下围的差距</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> AA</td>\n' +
        '                <td> 约7.5cm</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> A</td>\n' +
        '                <td> 约10cm</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> B</td>\n' +
        '                <td> 约12.5cm</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> C</td>\n' +
        '                <td> 约15cm</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> D</td>\n' +
        '                <td> 约17.5cm</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> E</td>\n' +
        '                <td> 约20cm</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">女士文胸 — 罩杯尺寸</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标 准</th>\n' +
        '                <th> 中国</th>\n' +
        '                <th> 欧 洲</th>\n' +
        '                <th> 美 国</th>\n' +
        '                <th> 韩 国</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="14"> <span class="f12">尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td> A</td>\n' +
        '                <td> AA</td>\n' +
        '                <td> AA</td>\n' +
        '                <td> A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> B</td>\n' +
        '                <td> A</td>\n' +
        '                <td> A</td>\n' +
        '                <td> B</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> C</td>\n' +
        '                <td> B</td>\n' +
        '                <td> B</td>\n' +
        '                <td> C</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> D</td>\n' +
        '                <td> C</td>\n' +
        '                <td> C</td>\n' +
        '                <td> D</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> E</td>\n' +
        '                <td> D</td>\n' +
        '                <td> D</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> E</td>\n' +
        '                <td> DD</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> F</td>\n' +
        '                <td> DDD/E</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> F</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> FF</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> G</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> GG</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> H</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> HH</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '                <td> J</td>\n' +
        '                <td>&nbsp;\n' +
        '                </td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据不同制造商存在一些差异。 </li>\n' +
        '        <li>该尺码速查表根据款式和品牌多少存在一些差异。 </li>\n' +
        '        <li>英寸(in)=2.54CM / 英尺(ft)=30.48CM </li>\n' +
        '    </ul>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">测量尺码要点</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 胸围</th>\n' +
        '                <td> <span class="pl10">从BP点(乳点) 绕过肩胛骨测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 腰围</th>\n' +
        '                <td> <span class="pl10">在髋骨上部沿着自然腰身线条从内衣外进行测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 臀围</th>\n' +
        '                <td> <span>在臀部最宽部位测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 脖围</th>\n' +
        '                <td> <span>从衣领最上沿开始测量脖围</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 裙长</th>\n' +
        '                <td> <span>从腰身直线向下测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 身高</th>\n' +
        '                <td> <span>脱鞋后正确测量头顶到脚后跟</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 裤长</th>\n' +
        '                <td> <span>从腰身量到脚踝处</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 袖长</th>\n' +
        '                <td> <span>从肩量到手腕</span></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">臀围尺寸(cm)点</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <colgroup>\n' +
        '            <col width="176">\n' +
        '                <col width="176">\n' +
        '                    <col width="176">\n' +
        '                        <col width="176">\n' +
        '        </colgroup>\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th class="cellP"> S</th>\n' +
        '                <th class="cellP"> M</th>\n' +
        '                <th class="cellP"> L</th>\n' +
        '                <th class="cellP nobr"> XL</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td class="nobb"> <span class="f_ver">80 - 88 (约34吋)</span></td>\n' +
        '                <td class="nobb"> <span class="f_ver">85 - 93 (约38吋)</span></td>\n' +
        '                <td class="nobb"> <span class="f_ver">90 - 98 (约38吋)</span></td>\n' +
        '                <td class="nobb nobr"> <span class="f_ver">100 - 108 (约42吋)</span></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>\n',
        '<!--童装尺码对照表-->\n' +
        '<div class="size-ref-tab-con">\n' +
        '    <span class="size-ref-tab-title">童装尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th>标准</th>\n' +
        '                <th>尺码</th>\n' +
        '                <th>年龄</th>\n' +
        '                <th>适合身高（cm）</th>\n' +
        '                <th>胸围(cm)</th>\n' +
        '                <th>腰围(cm)</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="12"><span>尺<br>    码<br>    明<br>    细</span></td>\n' +
        '                <td>56</td>\n' +
        '                <td>0~0.3</td>\n' +
        '                <td>52~59</td>\n' +
        '                <td>40</td>\n' +
        '                <td>40</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>65</td>\n' +
        '                <td>0.3~0.6</td>\n' +
        '                <td>59~73</td>\n' +
        '                <td>44</td>\n' +
        '                <td>43</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>75</td>\n' +
        '                <td>0.6~1</td>\n' +
        '                <td>73~80</td>\n' +
        '                <td>48</td>\n' +
        '                <td>48</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>80</td>\n' +
        '                <td>1~2</td>\n' +
        '                <td>75~85</td>\n' +
        '                <td>50</td>\n' +
        '                <td>49</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>90</td>\n' +
        '                <td>2~3</td>\n' +
        '                <td>85~95</td>\n' +
        '                <td>52</td>\n' +
        '                <td>50</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>100</td>\n' +
        '                <td>3~4</td>\n' +
        '                <td>95~105</td>\n' +
        '                <td>54</td>\n' +
        '                <td>51</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>110</td>\n' +
        '                <td>4~5</td>\n' +
        '                <td>105~115</td>\n' +
        '                <td>57</td>\n' +
        '                <td>52</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>120</td>\n' +
        '                <td>6~7</td>\n' +
        '                <td>115~125</td>\n' +
        '                <td>60</td>\n' +
        '                <td>54</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>130</td>\n' +
        '                <td>8~9</td>\n' +
        '                <td>125~135</td>\n' +
        '                <td>64</td>\n' +
        '                <td>57</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>140</td>\n' +
        '                <td>10~11</td>\n' +
        '                <td>135~145</td>\n' +
        '                <td>68</td>\n' +
        '                <td>61</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>150</td>\n' +
        '                <td>12~13</td>\n' +
        '                <td>145~155</td>\n' +
        '                <td>72</td>\n' +
        '                <td>64</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>160</td>\n' +
        '                <td>14~15</td>\n' +
        '                <td>155~165</td>\n' +
        '                <td>76</td>\n' +
        '                <td>66</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">童鞋尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th>标准</th>\n' +
        '                <th>厘米</th>\n' +
        '                <th>中国码</th>\n' +
        '                <th>欧洲</th>\n' +
        '                <th>美国</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="28"><span>尺<br>    码<br>    明<br>    细</span></td>\n' +
        '                <td>8</td>\n' +
        '                <td>19</td>\n' +
        '                <td>17</td>\n' +
        '                <td>1</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>8.5</td>\n' +
        '                <td>19.5</td>\n' +
        '                <td>18</td>\n' +
        '                <td>2.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>9</td>\n' +
        '                <td>20</td>\n' +
        '                <td>18.5</td>\n' +
        '                <td>3</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>9.5</td>\n' +
        '                <td>20.5</td>\n' +
        '                <td>19</td>\n' +
        '                <td>3.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>10</td>\n' +
        '                <td>21</td>\n' +
        '                <td>19.5</td>\n' +
        '                <td>4</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>10.5</td>\n' +
        '                <td>21.5</td>\n' +
        '                <td>20</td>\n' +
        '                <td>4.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>11</td>\n' +
        '                <td>22</td>\n' +
        '                <td>20.5</td>\n' +
        '                <td>5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>11.5</td>\n' +
        '                <td>22.5</td>\n' +
        '                <td>21</td>\n' +
        '                <td>5.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>12</td>\n' +
        '                <td>23</td>\n' +
        '                <td>21.5</td>\n' +
        '                <td>6</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>12.5</td>\n' +
        '                <td>23.5</td>\n' +
        '                <td>22</td>\n' +
        '                <td>6.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>13</td>\n' +
        '                <td>24</td>\n' +
        '                <td>22.5</td>\n' +
        '                <td>7</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>13.5</td>\n' +
        '                <td>24.5</td>\n' +
        '                <td>23.5</td>\n' +
        '                <td>7.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>14</td>\n' +
        '                <td>25</td>\n' +
        '                <td>24.5</td>\n' +
        '                <td>8</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>14.5</td>\n' +
        '                <td>25.5</td>\n' +
        '                <td>25</td>\n' +
        '                <td>8.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>15</td>\n' +
        '                <td>26</td>\n' +
        '                <td>25.5</td>\n' +
        '                <td>9</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>15.5</td>\n' +
        '                <td>26.5</td>\n' +
        '                <td>26</td>\n' +
        '                <td>9.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>16</td>\n' +
        '                <td>27</td>\n' +
        '                <td>26.5</td>\n' +
        '                <td>10</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>16.5</td>\n' +
        '                <td>27.5</td>\n' +
        '                <td>27</td>\n' +
        '                <td>10.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>17</td>\n' +
        '                <td>28</td>\n' +
        '                <td>27.5</td>\n' +
        '                <td>11</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>17.5</td>\n' +
        '                <td>28.5</td>\n' +
        '                <td>28</td>\n' +
        '                <td>11.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>18</td>\n' +
        '                <td>29.5</td>\n' +
        '                <td>28.5</td>\n' +
        '                <td>12</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>18.5</td>\n' +
        '                <td>30</td>\n' +
        '                <td>29.5</td>\n' +
        '                <td>12.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>19</td>\n' +
        '                <td>31</td>\n' +
        '                <td>30.5</td>\n' +
        '                <td>13</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>19.5</td>\n' +
        '                <td>31.5</td>\n' +
        '                <td>31</td>\n' +
        '                <td>13.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>20</td>\n' +
        '                <td>32</td>\n' +
        '                <td>32</td>\n' +
        '                <td>14</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>20.5</td>\n' +
        '                <td>33</td>\n' +
        '                <td>33</td>\n' +
        '                <td>14.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>21</td>\n' +
        '                <td>33.5</td>\n' +
        '                <td>34</td>\n' +
        '                <td>15</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>21.5</td>\n' +
        '                <td>34</td>\n' +
        '                <td>35</td>\n' +
        '                <td>15.5</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="categoryInfo">\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据不同制造商存在一些差异。 </li>\n' +
        '        <li>该尺码速查表根据款式和品牌多少存在一些差异。 </li>\n' +
        '    </ul>\n' +
        '</div>\n',
        '<!--裤子对照表-->\n' +
        '<div class="size-ref-tab-con">\n' +
        '    <span class="size-ref-tab-title">女装裤子尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标准</th>\n' +
        '                <th> 国际</th>\n' +
        '                <th colspan="2"> 美国</th>\n' +
        '                <th> 韩 国</th>\n' +
        '                <th> 中国</th>\n' +
        '                <th> 腰围\n' +
        '                    <br> （市尺）</th>\n' +
        '                <th> 腰围\n' +
        '                    <br> （cm）</th>\n' +
        '                <th> 臀围\n' +
        '                    <br> （市尺）</th>\n' +
        '                <th> 臀 围\n' +
        '                    <br> （cm）</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="9"> <span>尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td> XXXS</td>\n' +
        '                <td> 00</td>\n' +
        '                <td> 00</td>\n' +
        '                <td> 21</td>\n' +
        '                <td> 23</td>\n' +
        '                <td> 1 尺6</td>\n' +
        '                <td> 55~57</td>\n' +
        '                <td> 2尺3</td>\n' +
        '                <td> 77~80</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXS</td>\n' +
        '                <td> 0</td>\n' +
        '                <td> 0</td>\n' +
        '                <td> 22</td>\n' +
        '                <td> 24</td>\n' +
        '                <td> 1 尺7</td>\n' +
        '                <td> 57~60</td>\n' +
        '                <td> 2尺4</td>\n' +
        '                <td> 80~83</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XS</td>\n' +
        '                <td> 2</td>\n' +
        '                <td> 1/2</td>\n' +
        '                <td> 24</td>\n' +
        '                <td> 25</td>\n' +
        '                <td> 1 尺8</td>\n' +
        '                <td> 60</td>\n' +
        '                <td> 2尺5</td>\n' +
        '                <td> 83</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> S</td>\n' +
        '                <td> 4</td>\n' +
        '                <td> 3/4,5/6</td>\n' +
        '                <td> 25~26</td>\n' +
        '                <td> 26</td>\n' +
        '                <td> 1 尺9</td>\n' +
        '                <td> 63</td>\n' +
        '                <td> 2尺6</td>\n' +
        '                <td> 87</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> M</td>\n' +
        '                <td> 6</td>\n' +
        '                <td> 7/8,9/10</td>\n' +
        '                <td> 27~29</td>\n' +
        '                <td> 27</td>\n' +
        '                <td> 2 尺</td>\n' +
        '                <td> 67</td>\n' +
        '                <td> 2尺7</td>\n' +
        '                <td> 90</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> L</td>\n' +
        '                <td> 8</td>\n' +
        '                <td> 11/12,13/14</td>\n' +
        '                <td> 30~32</td>\n' +
        '                <td> 28</td>\n' +
        '                <td> 2 尺1</td>\n' +
        '                <td> 70</td>\n' +
        '                <td> 2尺8</td>\n' +
        '                <td> 93</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XL</td>\n' +
        '                <td> 10</td>\n' +
        '                <td> 15/16</td>\n' +
        '                <td> 34</td>\n' +
        '                <td> 29</td>\n' +
        '                <td> 2 尺2</td>\n' +
        '                <td> 73</td>\n' +
        '                <td> 2尺9</td>\n' +
        '                <td> 97</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXL</td>\n' +
        '                <td> 12</td>\n' +
        '                <td> 17/18</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 30</td>\n' +
        '                <td> 2 尺3</td>\n' +
        '                <td> 77</td>\n' +
        '                <td> 3尺</td>\n' +
        '                <td> 100</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXXL</td>\n' +
        '                <td> 14</td>\n' +
        '                <td> 18/19</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 31</td>\n' +
        '                <td> 2 尺4</td>\n' +
        '                <td> 80</td>\n' +
        '                <td> 3尺1</td>\n' +
        '                <td> 103</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>英寸(in)=2.54CM / 英尺(ft)=30.48CM </li>\n' +
        '        <li>海外商品实际上比标识尺码略大一些，敬请参考。 </li>\n' +
        '        <li>上述腰围指实际腰身尺寸，并不是裤子的尺码。 </li>\n' +
        '        <li>P码:是XS~XXS之间</li>\n' +
        '        <li>部分裤装根据裤长不同，尺码上分为S r l，s为短板，r为正常版，l为加长版。 </li>\n' +
        '    </ul>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">男装装裤子尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标准</th>\n' +
        '                <th> 国际</th>\n' +
        '                <th> 欧洲</th>\n' +
        '                <th> 美国</th>\n' +
        '                <th> 韩国</th>\n' +
        '                <th> 韩国腰围</th>\n' +
        '                <th> 中国</th>\n' +
        '                <th> 腰围\n' +
        '                    <br> （市尺）</th>\n' +
        '                <th> 腰围\n' +
        '                    <br> （cm）</th>\n' +
        '                <th> 臀围\n' +
        '                    <br> （市 尺）</th>\n' +
        '                <th> 臀围\n' +
        '                    <br> （cm）</th>\n' +
        '                <th> 身高\n' +
        '                    <br> (cm)</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="11"> <span class="f12">尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 26</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 26</td>\n' +
        '                <td> 1 尺9</td>\n' +
        '                <td> 63</td>\n' +
        '                <td> 2尺6</td>\n' +
        '                <td> 87</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 27</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 27</td>\n' +
        '                <td> 2 尺</td>\n' +
        '                <td> 67</td>\n' +
        '                <td> 2尺7</td>\n' +
        '                <td> 90</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXS</td>\n' +
        '                <td> 70</td>\n' +
        '                <td> 28</td>\n' +
        '                <td> -</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 28</td>\n' +
        '                <td> 2 尺1</td>\n' +
        '                <td> 70</td>\n' +
        '                <td> 2尺8</td>\n' +
        '                <td> 93</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XS</td>\n' +
        '                <td> 72</td>\n' +
        '                <td> 29</td>\n' +
        '                <td> 26</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 29</td>\n' +
        '                <td> 2 尺2</td>\n' +
        '                <td> 73</td>\n' +
        '                <td> 2尺9</td>\n' +
        '                <td> 97</td>\n' +
        '                <td> 160/66A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> S</td>\n' +
        '                <td> 74</td>\n' +
        '                <td> 30</td>\n' +
        '                <td> 28-30</td>\n' +
        '                <td> 71-76</td>\n' +
        '                <td> 30</td>\n' +
        '                <td> 2 尺3</td>\n' +
        '                <td> 77</td>\n' +
        '                <td> 3尺</td>\n' +
        '                <td> 100</td>\n' +
        '                <td> 165/70A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> M</td>\n' +
        '                <td> 76</td>\n' +
        '                <td> 31</td>\n' +
        '                <td> 32-34</td>\n' +
        '                <td> 81-86</td>\n' +
        '                <td> 31</td>\n' +
        '                <td> 2 尺4</td>\n' +
        '                <td> 80</td>\n' +
        '                <td> 3尺1</td>\n' +
        '                <td> 103</td>\n' +
        '                <td> 170/74A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> L</td>\n' +
        '                <td> 78</td>\n' +
        '                <td> 32</td>\n' +
        '                <td> 36-38</td>\n' +
        '                <td> 91-96</td>\n' +
        '                <td> 32</td>\n' +
        '                <td> 2 尺5</td>\n' +
        '                <td> 83</td>\n' +
        '                <td> 3尺2</td>\n' +
        '                <td> 107</td>\n' +
        '                <td> 175/78A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XL</td>\n' +
        '                <td> 80</td>\n' +
        '                <td> 33</td>\n' +
        '                <td> 40-42</td>\n' +
        '                <td> 101-106</td>\n' +
        '                <td> 33</td>\n' +
        '                <td> 2 尺6</td>\n' +
        '                <td> 87</td>\n' +
        '                <td> 3尺3</td>\n' +
        '                <td> 110</td>\n' +
        '                <td> 180/82A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXL</td>\n' +
        '                <td> 82</td>\n' +
        '                <td> 34</td>\n' +
        '                <td rowspan="2"> 45-47</td>\n' +
        '                <td rowspan="2"> 111-</td>\n' +
        '                <td> 34</td>\n' +
        '                <td> 2尺7</td>\n' +
        '                <td> 90</td>\n' +
        '                <td> 3尺4</td>\n' +
        '                <td> 113</td>\n' +
        '                <td> 185/86A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXL</td>\n' +
        '                <td> 88</td>\n' +
        '                <td> 36</td>\n' +
        '                <td> 36</td>\n' +
        '                <td> 2尺8</td>\n' +
        '                <td> 93</td>\n' +
        '                <td> 3 尺5</td>\n' +
        '                <td> 117</td>\n' +
        '                <td> 185/86A</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> XXXL</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 38</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td>&nbsp; </td>\n' +
        '                <td> 38</td>\n' +
        '                <td> 2 尺9</td>\n' +
        '                <td> 97</td>\n' +
        '                <td> 3尺7-3尺8</td>\n' +
        '                <td> 123-127</td>\n' +
        '                <td> 190/90A</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>部分裤子根据裤长不同分为S &lt; R &lt; L，S为短版，R为正常版，L为加长版。 </li>\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据不同制造商存在一些差异。</li>\n' +
        '        <li>该尺码速查表根据款式和品牌多少存在一些差异。 </li>\n' +
        '    </ul>\n' +
        '    <span class="size-ref-tab-title">尺码测量要点</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 腰围</th>\n' +
        '                <td> <span class="pl10">在髋骨上部沿着自然腰身线条从内衣外进行测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 臀围</th>\n' +
        '                <td> <span class="pl10">在臀部最宽部位测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 裙长</th>\n' +
        '                <td> <span class="pl10">从腰身直线向下测量</span></td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <th> 裤长</th>\n' +
        '                <td> <span class="pl10">从腰身量到脚踝处</span></td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '</div>\n',
        '<!--鞋子尺码对照表-->\n' +
        '<div class="size-ref-tab-con">\n' +
        '    <span class="size-ref-tab-title">女鞋尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标准</th>\n' +
        '                <th> 脚长（cm）</th>\n' +
        '                <th> 中国码</th>\n' +
        '                <th> 欧洲码</th>\n' +
        '                <th> 美 国码</th>\n' +
        '                <th> 韩国码</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="12"> <span>尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td> 22.5</td>\n' +
        '                <td> 35</td>\n' +
        '                <td> 35</td>\n' +
        '                <td> 5</td>\n' +
        '                <td> 225</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 23</td>\n' +
        '                <td> 36</td>\n' +
        '                <td> 36</td>\n' +
        '                <td> 5.5</td>\n' +
        '                <td> 230</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 23.5</td>\n' +
        '                <td> 37</td>\n' +
        '                <td> 37</td>\n' +
        '                <td> 6</td>\n' +
        '                <td> 235</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 24</td>\n' +
        '                <td> 38</td>\n' +
        '                <td> 38</td>\n' +
        '                <td> 6.5</td>\n' +
        '                <td> 240</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 24.5</td>\n' +
        '                <td> 39</td>\n' +
        '                <td> 39</td>\n' +
        '                <td> 7</td>\n' +
        '                <td> 245</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 25</td>\n' +
        '                <td> 39.5</td>\n' +
        '                <td> 39.5</td>\n' +
        '                <td> 7.5</td>\n' +
        '                <td> 245-250</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 25.5</td>\n' +
        '                <td> 40</td>\n' +
        '                <td> 40</td>\n' +
        '                <td> 8</td>\n' +
        '                <td> 250</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 26</td>\n' +
        '                <td> 40.5</td>\n' +
        '                <td> 40.5</td>\n' +
        '                <td> 8.5</td>\n' +
        '                <td> 250-255</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 26.5</td>\n' +
        '                <td> 41</td>\n' +
        '                <td> 41</td>\n' +
        '                <td> 9</td>\n' +
        '                <td> 255</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 27</td>\n' +
        '                <td> 41.5</td>\n' +
        '                <td> 41.5</td>\n' +
        '                <td> 9.5</td>\n' +
        '                <td> 255-260</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>小码(S)、中码(M)、大码(L)标识的指S=5/6、M=7/8、L=9/10 尺码。 </li>\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据制造商不同存在一些差异。 </li>\n' +
        '        <li>该尺码速查标识的是普通的美国尺码，根据款式和品牌多少存在一些差异。 </li>\n' +
        '        <li>部分欧洲尺码和意大利尺码，没有半幅尺寸的请参考括号中的US尺码 </li>\n' +
        '        <li>部分鞋码根据脚掌宽的不同分为N &lt; M &lt; W或者 AA &lt; A &lt; B &lt; C &lt; D；N/AA,A为瘦版；M/B,C为正常版；W/D为加肥版；EE为最大加肥版，适合亚洲人的脚面高的特点 </li>\n' +
        '    </ul>\n' +
        '    <br>\n' +
        '    <span class="size-ref-tab-title">男鞋尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th> 标准</th>\n' +
        '                <th> 脚长（cm）</th>\n' +
        '                <th> 中国码</th>\n' +
        '                <th> 欧洲码</th>\n' +
        '                <th> 美 国码</th>\n' +
        '                <th> 韩国码</th>\n' +
        '                <th> 脚面尺码</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="15"> <span class="f12">尺<br>        码<br>        明<br>        细</span></td>\n' +
        '                <td> 24</td>\n' +
        '                <td> 38.5</td>\n' +
        '                <td> 38.5</td>\n' +
        '                <td> 6</td>\n' +
        '                <td> 240</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 24.5</td>\n' +
        '                <td> 39</td>\n' +
        '                <td> 39</td>\n' +
        '                <td> 6.5</td>\n' +
        '                <td> 245</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 25</td>\n' +
        '                <td> 40</td>\n' +
        '                <td> 40</td>\n' +
        '                <td> 7</td>\n' +
        '                <td> 250</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 25.5</td>\n' +
        '                <td> 40.5</td>\n' +
        '                <td> 40.5</td>\n' +
        '                <td> 7.5</td>\n' +
        '                <td> 255</td>\n' +
        '                <td> 7.0 OT - 7.5 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 26</td>\n' +
        '                <td> 41</td>\n' +
        '                <td> 41</td>\n' +
        '                <td> 8</td>\n' +
        '                <td> 260</td>\n' +
        '                <td> 8.0 OT - 8.5OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 26.5</td>\n' +
        '                <td> 42</td>\n' +
        '                <td> 42</td>\n' +
        '                <td> 8.5</td>\n' +
        '                <td> 265</td>\n' +
        '                <td> 9.0 OT - 9.5 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 27</td>\n' +
        '                <td> 42.5</td>\n' +
        '                <td> 42.5</td>\n' +
        '                <td> 9</td>\n' +
        '                <td> 270</td>\n' +
        '                <td> 10.0 OT - 10.5 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 27.5</td>\n' +
        '                <td> 43</td>\n' +
        '                <td> 43</td>\n' +
        '                <td> 9.5</td>\n' +
        '                <td> 275</td>\n' +
        '                <td> 11.0 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 28</td>\n' +
        '                <td> 44.5</td>\n' +
        '                <td> 44.5</td>\n' +
        '                <td> 10</td>\n' +
        '                <td> 280</td>\n' +
        '                <td> 12.0 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 28.5</td>\n' +
        '                <td> 45</td>\n' +
        '                <td> 45</td>\n' +
        '                <td> 10.5</td>\n' +
        '                <td> 285</td>\n' +
        '                <td> 13.0 OT</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 29</td>\n' +
        '                <td> 45.5</td>\n' +
        '                <td> 45.5</td>\n' +
        '                <td> 11</td>\n' +
        '                <td> 290</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 29.5</td>\n' +
        '                <td> 46</td>\n' +
        '                <td> 46</td>\n' +
        '                <td> 11.5</td>\n' +
        '                <td> 295</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 30</td>\n' +
        '                <td> 46.5</td>\n' +
        '                <td> 46.5</td>\n' +
        '                <td> 12</td>\n' +
        '                <td> 300</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 30.5</td>\n' +
        '                <td> 47</td>\n' +
        '                <td> 47</td>\n' +
        '                <td> 12.5</td>\n' +
        '                <td> 305</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td> 31</td>\n' +
        '                <td> 47.5</td>\n' +
        '                <td> 47.5</td>\n' +
        '                <td> 13</td>\n' +
        '                <td> 310</td>\n' +
        '                <td>&nbsp; </td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>S(size)= 5.6M(size)= 7.8 / L(size)= 9.10 / XL(size)= 11.12。\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>数字后面英文指鞋帮尺码，M、C、D指普通鞋帮、W指宽鞋帮。\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>数字后面无鞋帮尺码相关英文记号的，属基本鞋帮尺码商品。\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据制造商不同存在一些差异。\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>该尺码速查表根据款式和品牌多少存在一些差异。\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>a英寸(in)=2.54cm / 英尺(ft)=30.48cm\n' +
        '            <br>\n' +
        '        </li>\n' +
        '        <li>部分鞋码根据脚掌宽的不同分为N &lt; M &lt; W或者 AA &lt; A &lt; B &lt; C &lt; D；N/AA,A为瘦版；M/B,C为正常版；W/D为加肥版；EE为最大加肥版，适合亚洲人的脚面高的特点。 </li>\n' +
        '    </ul>\n' +
        '    <span class="size-ref-tab-title">童鞋尺码换算表</span>\n' +
        '    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="size-ref-tab">\n' +
        '        <tbody>\n' +
        '            <tr>\n' +
        '                <th>标准</th>\n' +
        '                <th>厘米</th>\n' +
        '                <th>中国码</th>\n' +
        '                <th>欧洲</th>\n' +
        '                <th>美国</th>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td rowspan="28"><span>尺<br>    码<br>    明<br>    细</span></td>\n' +
        '                <td>8</td>\n' +
        '                <td>19</td>\n' +
        '                <td>17</td>\n' +
        '                <td>1</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>8.5</td>\n' +
        '                <td>19.5</td>\n' +
        '                <td>18</td>\n' +
        '                <td>2.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>9</td>\n' +
        '                <td>20</td>\n' +
        '                <td>18.5</td>\n' +
        '                <td>3</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>9.5</td>\n' +
        '                <td>20.5</td>\n' +
        '                <td>19</td>\n' +
        '                <td>3.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>10</td>\n' +
        '                <td>21</td>\n' +
        '                <td>19.5</td>\n' +
        '                <td>4</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>10.5</td>\n' +
        '                <td>21.5</td>\n' +
        '                <td>20</td>\n' +
        '                <td>4.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>11</td>\n' +
        '                <td>22</td>\n' +
        '                <td>20.5</td>\n' +
        '                <td>5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>11.5</td>\n' +
        '                <td>22.5</td>\n' +
        '                <td>21</td>\n' +
        '                <td>5.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>12</td>\n' +
        '                <td>23</td>\n' +
        '                <td>21.5</td>\n' +
        '                <td>6</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>12.5</td>\n' +
        '                <td>23.5</td>\n' +
        '                <td>22</td>\n' +
        '                <td>6.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>13</td>\n' +
        '                <td>24</td>\n' +
        '                <td>22.5</td>\n' +
        '                <td>7</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>13.5</td>\n' +
        '                <td>24.5</td>\n' +
        '                <td>23.5</td>\n' +
        '                <td>7.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>14</td>\n' +
        '                <td>25</td>\n' +
        '                <td>24.5</td>\n' +
        '                <td>8</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>14.5</td>\n' +
        '                <td>25.5</td>\n' +
        '                <td>25</td>\n' +
        '                <td>8.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>15</td>\n' +
        '                <td>26</td>\n' +
        '                <td>25.5</td>\n' +
        '                <td>9</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>15.5</td>\n' +
        '                <td>26.5</td>\n' +
        '                <td>26</td>\n' +
        '                <td>9.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>16</td>\n' +
        '                <td>27</td>\n' +
        '                <td>26.5</td>\n' +
        '                <td>10</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>16.5</td>\n' +
        '                <td>27.5</td>\n' +
        '                <td>27</td>\n' +
        '                <td>10.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>17</td>\n' +
        '                <td>28</td>\n' +
        '                <td>27.5</td>\n' +
        '                <td>11</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>17.5</td>\n' +
        '                <td>28.5</td>\n' +
        '                <td>28</td>\n' +
        '                <td>11.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>18</td>\n' +
        '                <td>29.5</td>\n' +
        '                <td>28.5</td>\n' +
        '                <td>12</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>18.5</td>\n' +
        '                <td>30</td>\n' +
        '                <td>29.5</td>\n' +
        '                <td>12.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>19</td>\n' +
        '                <td>31</td>\n' +
        '                <td>30.5</td>\n' +
        '                <td>13</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>19.5</td>\n' +
        '                <td>31.5</td>\n' +
        '                <td>31</td>\n' +
        '                <td>13.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>20</td>\n' +
        '                <td>32</td>\n' +
        '                <td>32</td>\n' +
        '                <td>14</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>20.5</td>\n' +
        '                <td>33</td>\n' +
        '                <td>33</td>\n' +
        '                <td>14.5</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>21</td>\n' +
        '                <td>33.5</td>\n' +
        '                <td>34</td>\n' +
        '                <td>15</td>\n' +
        '            </tr>\n' +
        '            <tr>\n' +
        '                <td>21.5</td>\n' +
        '                <td>34</td>\n' +
        '                <td>35</td>\n' +
        '                <td>15.5</td>\n' +
        '            </tr>\n' +
        '        </tbody>\n' +
        '    </table>\n' +
        '    <ul class="size-ref-notes">\n' +
        '        <li>尺码速查表内的尺寸为一般尺寸对比表，根据不同制造商存在一些差异。 </li>\n' +
        '        <li>该尺码速查表根据款式和品牌多少存在一些差异。 </li>\n' +
        '    </ul>\n' +
        '</div>\n'
    ]
});
