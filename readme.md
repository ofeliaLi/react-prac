## 前言
学习react一段时间，一直觉得learning by doing，所以着手做了这个"仿美团"项目，没有实现全部功能，只实现了相对复杂的几个功能。之所以选择"仿"站项目，一方面是可以根据原网站作参考，另外一方面有原站数据，可以更专注于理解react 和 redux 的编译方式，以及 react + redux 之间的配合方式。

## 实现功能
- [x] 首页餐馆列表展示
- [x] 根据评分、销量、距离。商家特色、优惠活动等进行排序和筛选
- [x] 单个店铺详情页面 
- [x] 餐馆食品列表页 
- [x] 购物车功能 

## 技术栈
react + redux +  react-router-dom +  webpack + ES6/7/8

## 项目运行
	git clone https://github.com/ofeliaLi/react-prac.git
	cd react-prac
	npm install
	npm run start 

## 部分效果预览
### 排序筛选功能
![filter.gif](https://i.loli.net/2019/08/05/Ka1Q8kMbUtlrsVi.gif)
### 添加商品及购物车功能
![detail.gif](https://i.loli.net/2019/08/05/s7YWC59G8pHciEK.gif)

## 个人总结
实践就可以发现对于各种知识都有理解不到位甚至是不理解的地方，通过动手+总结+repeat 不断进步吧
#### 什么是react
React主要用于构建UI，在MVC模式中，只作为V层（视图层）。React强调组件化，聚焦于视图层，将界面分成了各个独立的小块，每一块就是一个组件，组件的组合、嵌套组成了页面。
#### 为什么使用react
首先不得不提起React的virtual dom，React将dom抽象为js对象，每次组件状态变更的时候，就会创建新的虚拟dom，并和之前的虚拟dom进行比较，通过对比新旧虚拟dom两个对象的差异（diff算法），最终只将变化的部分重新渲染，整个过程避免了dom操作；
另外是React的组件化开发思想，将相同业务逻辑、展示形态的代码抽离出来，使得代码更加容易的得到复用；
以及React组件的行为和形态都是由数据决定的，推崇单向数据流，自上而下由父组件向子组件进行数据传递，因此当出现问题时，很容易通过数据监控找到问题所在。
#### React的diff算法
前面我们说过了每次当组件状态变更的时候，React会创建一个新的虚拟dom树并且和之前储存的dom树进行比较，这个比较过程中使用的就是diff算法。
React对传统diff算法进行了优化，其策略为：
1. DOM节点跨层级的移动操作特别少，可以忽略不计（例如A原本和B平级，随后A变成B的子节点。
2.  拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
3. 同一层级的一组子节点，它们可以通过唯一id进行区分。

diff算法执行时有三个维度，Tree diff、Components diff和Elements diff。
Tree diff：对dom树的进行分层比较，如果某一节点不存在了，则会直接销毁这个节点及其所包含的所有子节点，替换成新的节点。
Components diff：组件间比较时，对于同一类型的组件，根据shouldComponentUpdate( )判断虚拟DOM是否发生了变化，若没有变化就不需要在进行diff，如果变化了，就对相关节点进行update；对于非同一类的组件，将进行直接替换，删掉旧组件，重建新组件。
Elements diff：对于同一层级的子节点，他们都可以通过key来区分（因此我们需要确保某个元素的key在同级中具有唯一性），常见类型就是列表，同一个列表由旧变新有三种行为，插入、移动和删除，它根据指定的key值，先将所有列表遍历一遍，确定要新增和删除的，再确定需要移动的。

#### React组件
1. 无状态组件：
     ```javascript 
	 let Hello = props => <div>Hello {props.name}</div> 
	 ```
	接受props作为参数，返回有效的JSX的js函数；组件只负责根据传入的props来展示，当props改变时，重新渲染，不涉及state状态的操作；当组件不需要用到生命周期函数以及无需state时，使用函数式无状态组件可以有效提升组件性能、便于测试。
	
2. React.Component: 
以ES6的class来创建React的组件，这是React目前极为推荐的创建有状态组件的方式，定义的class继承了React.Component所有的属性和方法(组件的生命周期函数就是从这来的)。