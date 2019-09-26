const ApiData = {
  getPrice: {
    url: '//test/prices',
    maxComboNum: 10,
    requestMethod: 'get',
    pack(paramList) {
      const skuids = []
      paramList.forEach((p) => {
        skuids.push(p.skuids)
      })
      const ret = {
        skuids: skuids.join(','),
      }

      console.log('合并后的价格参数', ret)
      return ret
    },
    unpack(data, paramList) {
      if (data.length) {
        const ret = {}
        paramList.forEach((p) => {
          const key = JSON.stringify(p)
          data.some((item, i) => { // eslint-disable-line
            const sku = item.id.split('_')[1]
            if (sku === p.skuids) {
              ret[key] = [data[i]]
              return true
            }
          })
        })
        console.log('价格拆解数据', ret)
        return ret
      }
      return {}
    },
  },
}

export default ApiData
