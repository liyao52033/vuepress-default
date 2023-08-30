---
title: springboot2引入swagger3
author: 华总
date: 2023/8/24 14:02:56
autoSort: 998
---

## 1. 引入依赖

[最新版本](https://doc.xiaominfo.com/docs/quick-start#openapi3)

```java
 <dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi3-spring-boot-starter</artifactId>
    <version>最新版本</version>   
</dependency>
```

##  2. 填写yml配置文件

```yaml
springdoc:
  swagger-ui:
    path: /swagger-ui.html
    tags-sorter: alpha
    operations-sorter: method
  api-docs:
    path: /v3/api-docs
  group-configs:
    - group: 'default'
      paths-to-match: '/**'
      packages-to-scan: com.yupi.springbootinit.controller
# knife4j的增强配置，不需要增强可以不配
knife4j:
  enable: true
  setting:
    language: zh_cn
```

## 3. 新建配置文件Knife4jConfig

```java
@Configuration
@Profile({"dev", "prod", "test"})
public class Knife4jConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                    .title("接口文档")
                    .version("1.0")
                    .description("属性：[https://springdoc.org/index.html#properties](https://springdoc.org/index.html#properties)，常见问题：[https://springdoc.org/#faq](https://springdoc.org/#faq)")
                    .termsOfService("https://smartbear.com/terms-of-use/")
                    .contact(new Contact().name("华总, 邮箱：liyao52033@163.com, 网站：https://wx.zsxq.com/dweb2/index/group/51112524211554"))
            );

    }
}
```



<div style="float: right;font-size: .9em;line-height: 30px;">
  <div>
     <span style="font-weight: 500;color: #4e6e8e;">By: </span> 
     <span style="font-weight: 400; color: #767676;">{{ $page.frontmatter.author }}   </span>
  </div>
</div>
