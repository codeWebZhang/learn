//  https://github.com/zwwill/blog/issues/1

//  https://www.infoq.cn/article/g_yqbu1txmmpeelof8wt



//   首屏优化方案

// 1、JavaScript外联文件引用放在html文档底部；CSS外联文件引用在html文档头部，位于head内；对首屏页面用到的 css内容，可以style 的形式写在首页

// 2、首屏不需要展示的较大尺寸图片，请使用lazyload；

// 3、避免404错误：尽量减少外联js；

// 4、减少cookies的大小：尽量减少cookies的体积对减少用户获得响应的时间十分重要；

// 5、减少DOM Elements的数量；

// 6、Webpack开启gzip压缩
      //原理
      //  1. 浏览器请求资源文件时会自动带一个Accept-Encoding的请求头告诉服务器支持的压缩编码类型
      //   2.服务器配置开启gzip选项：
      //   接收客户端资源文件请求，查看请求头Content-encoding支持的压缩编码格式，如果是包含gzip那么
      //   在每次响应资源请求之前进行gzip编码压缩后再响应返回资源文件(在响应头会带上Content-encoding: gzip)
      //   3.浏览器接收到响应后查看请求头是否带有Content-encoding:gzip，如果有进行对返回的资源文件进行解压缩然后再进行解析渲染

// 7、服务端渲染SSR

// 8、Skeleton Screen (骨架屏)

// 9、路由懒加载

// 10、图片懒加载(vue-lazyload)

// 11、Promise优化

// 12、减少http请求

// 13、精灵图可以大大地减少CSS背景图片的HTTP请求次数；

// 14、压缩图片

// 15、CDN优化

// 16、少用location.reload()

// 17、正确使用display的属性

// 18、采用按需加载

// 19、压缩图片优化

// 20、合理使用缓存

// 21、预加载

// 22、使用icontfont代替图片

// 23、meta dns prefetch 设置dns预解析
      // 设置文件资源的 DNS 预解析，让浏览器提前解析获取静态资源的主机 IP，避免等到请求时才发起 DNS 解析请求。通常在移动端 HTML 中可以采用如下方式完成
      // <!--cdn域名预解析-->
      // <meta http-equiv="x-dns-prefetch-control" content="on" >
      // <link rel="dns-prefetch" href="//cdn.domain.com" ></link>

// 24、首屏数据请求提前，避免 JavaScript 文件加载后才请求数据
      // 为了进一步提升页面加载速度，可以考虑将页面的数据请求尽可能提前，避免在 JavaScript 加载完成后才去请求数据。通常数据请求是页面内容渲染中关键路径最长的部分，而且不能并行，所以如果能将数据请求提前，可以极大程度上缩短页面内容的渲染完成时间。

// 25、使用静态资源分域存放来增加下载并行数
      //浏览器在同一时刻向同一个域名请求文件的并行下载数是有限的，因此可以利用多个域名的主机来存放不同的静态资源，增大页面加载时资源的并行下载数，缩短页面资源加载的时间。通常根据多个域名来分别存储 JavaScript、CSS 和图片文件。
      //<link rel="stylesheet" href="//cdn1.domain.com/path/main.css" >
      // ...
      // <script src="//cdn2.domain.com/path/main.js"></script>


// 26、 使用 CDN Combo 下载传输内容
      //CDN Combo 是在 CDN 服务器端将多个文件请求打包成一个文件的形式来返回的技术，这样可以实现 HTTP 连接传输的一次性复用，减少浏览器的 HTTP 请求数，加快资源下载速度。例如同一个域名 CDN 服务器上的 a.js，b.js，c.js 就可以按如下方式在一个请求中下载。

// 27、减少 Cookie 的大小并进行 Cookie 隔离
      //HTTP 请求通常默认带上浏览器端的 Cookie 一起发送给服务器，所以在非必要的情况下，要尽量减少 Cookie 来减小 HTTP 请求的大小。对于静态资源，尽量使用不同的域名来存放，因为 Cookie 默认是不能跨域的，这样就做到了不同域名下静态资源请求的 Cookie 隔离。

      // ---Promise--优化原理
    // 课程首页的请求数为8，请求都为异步请求，而我们的浏览器对同一域下的请求数量是有限制的，超过限制数目的请求会被阻塞，以谷歌浏览器的6个并发请求量为例，课程首页的数据请求和图片请求加起来成百上千个，上面，我们对图片请求已经做了处理，使用懒加载的方式，另外，放在和数据请求不同的域下，我们需要考虑的就是数据请求，采用了promise的方式，如下：

    // return new Promise((resolve,reject) => {

    // })
    // 采用这种方式的另一个原因是，如果所有异步请求同时触发的话，浏览器会为他们分配执行的优先级，而采用这种方式，请求的顺序会按照我们调用的顺序执行。而浏览器分配的话，可能页面底部的请求会先执行。在请求较少的情况下，这种差异是体现的不明显。

    // 提到promise，我觉得最大的好处就是如它设计的初衷那样，解决了层层回调的问题（难以维护，且不优雅）--链式调用，还有Promise.all()的用法，对于组合数据很方便

  //打破浏览器限制
    // 在DNS服务商中申请多个域名，指向同一个 IP 服务。
    // 对后台返回的数据进行域名处理，对图片链接，进行域名替换。
    // 域名替换完成后，通过 localStorage 进行 key / value 保存。以使得相同图片在下一次展示时，能使用浏览器缓存，而非重复加载。
  
    //另外，为了加快DNS解析，可以进行DNS预加载
      // <!-- 配置 Mate 进行域名预加载 -->
      // <!-- dns预加载 -->
      // <link rel="dns-prefetch" href="//node1.baidu.com" />
      // <link rel="dns-prefetch" href="//node2.baidu.com" />
    
