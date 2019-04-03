这个项目的灵感来源于日文网站 [東方キャラソート](http://readalittle.net/sort/)。在编写时也有许多细节参考了这个网站。我们在此基础上，进行了一些改变：

1. 将全部内容翻译成了中文。
2. 对网站进行了移动端适配。
3. 增删了一些角色（比如增加了冴月麟，删除了旧作与新作重合的角色）。
4. 基于原网站缺乏角色在后期作品中出场的记录，我们重新将全部角色进行分类。
5. 结果页增加了与人气投票的对比，并添加了标签取向判断的功能。

下面是大家或许好奇的一些问题，我们将一一解答。

## 关于算法

这种排序的原理是 [Pairwise Comparison](https://en.wikipedia.org/wiki/Pairwise_comparison)。根据选择的顺序，结果可能会发生不同。排序的过程使用了堆排序。

计算标签取向的算法如下：

$$w=\sum_{i=1}^n\frac{1}{(r_i+3)(1+1.1^{r_i-p_i})}$$

## 我提供新的标签，好吗？

当然可以。不仅是标签，任何你想到的创意都欢迎前往[这里](https://github.com/uzkk/favorite/issues)提出。

## 版权与协议

图片采用了画师 [dairi](https://www.pixiv.net/member_illust.php?id=4920496) 的作品。全部人物来源于东方 Project，版权属于上海爱丽丝幻乐团。

源代码已经开源到 [GitHub](https://github.com/uzkk/favorite)，遵循 [MIT](https://mit-license.org/) 协议。脚本的使用，修改，复制等是免费的。

[点此返回测试页面](/favorite/)
