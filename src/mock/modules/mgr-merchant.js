import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'roleId': '@increment',
    'roleName': '@name',
    'remark': '@csentence',
    'createUserId': 1,
    'menuIdList': '@range(1, 10, 2)',
    'createTime': '@datetime'
  }))
}

// 获取商户列表
export function list () {
  return {
    // isOpen: false,
    url: '/mgr/merchant/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}
