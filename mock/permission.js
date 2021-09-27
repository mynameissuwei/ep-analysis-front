const Mock = require("mockjs");

const data = Mock.mock({
  "items|10": [
    {
      authId: "@id",
      appId: "@id",
      authName: "@cname",
      authType: /\d{5,10}/,
      authDesc: "@sentence(5, 10)",
      audit: 1, // 1: 发布 0:下线
      "audit|1": ["1", "0"]
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/permission/list",
    type: "get",
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: items,
        total: items.length
      };
    }
  },
  {
    url: "/vue-admin-template/permission",
    type: "delete",
    response: {
      code: 20000,
      data: {
        status: "success"
      }
    }
  }
];
