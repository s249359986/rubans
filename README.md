## FE通用方法库
#### 一：安装
安装
```
npm install rubans
```

#### 二：使用
在所需项目目录中import引入,以判断Number为例----bNumber
```
import {bNumber} from 'rubans' （推荐，导入所需部分）
在所需要页面引用bNumber()即可
```

```
import * as rubans from 'rubans' （不推荐，导入所有）
在所需要页面引用rubans.bNumber()即可
```

#### 三：相关API
大致分为几类，详细api以及用法参考docs文件下index.html

* 1.cookie

* 2.storage

* 3.url(获取与url相关的参数等)

* 4.validator(常用验证)

* 5.platform(判断终端信息)

* 6.formateTime(时间戳转化)

* 7.commonData(通用数据类型判断)

* 8.commonOther(通用其它常见方法)


#### 四：详细目录结构
```
until                # 通用方法库
├── dist             # 编译后生成
├── docs             # 可视化方法用法说明以及展示
├── node_moules      # 打项目依赖
├── src              # 项目资源文件，代码出处
├── template         # jsdoc样式出处
├── test             # 项目测试目录
├── 其他              # 项目，脚手架所需的基本配置

```

#### 五：日志规则： eg
* 版本号--时间
* 详细说明fix哪个方法,add什么方法