/* 
  环境配置文件
  开发环境
  测试环境
  线上环境

*/
// 当前的环境
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  development:{
    baseApi:'/api',
    mockApi:'https://www.fastmock.site/mock/49e7104b0ad13619b7539359ad2577e3/api',
  },
  test:{
    baseApi:'//test.future.com/api',
    mockApi:'https://www.fastmock.site/mock/49e7104b0ad13619b7539359ad2577e3/api',
  },
  pro:{
    baseApi:'//future.com/api',
    mockApi:'https://www.fastmock.site/mock/49e7104b0ad13619b7539359ad2577e3/api',
  }
}

export default{
  env,
  // mock总开关
  mock:false,
  ...EnvConfig[env]
}