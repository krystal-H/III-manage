/**
 * @param {
 * } datasource  表格数据   Array
 * @param {*} key    当前合并字段key
 * @param {*} index  当前数据行的索引值
 * @param {*} value   值
 * @param {*} firstKey   表格每行的第一个展示的字段
 * @returns
 */

export const getRowSpanCount = (datasource, key, index, value, firstKey) => {
  if (!Array.isArray(datasource)) return 1;
  let datas = datasource.map((_) => _[firstKey]); //第一字段数组集合
  let arrKey = datasource.map((_) => _[key]); //需要排序字段的数组集合
  let preValue = datas[0];
  const res = [[preValue]]; // 放进二维数组里
  let idx = 0; // 二维数组下标
  //1.第一个字段进行相同给的合并，组成二维数组
  for (let i = 1; i < datas.length; i++) {
    if (datas[i] === preValue) {
      // 相同放进二维数组
      res[idx].push(datas[i]);
    } else {
      // 不相同二维数组下标后移
      idx += 1;
      res[idx] = [];
      res[idx].push(datas[i]);
      preValue = datas[i];
    }
  }
  //2.根据上一步对需要排序的数据组成二维数组
  let sortArry = [];
  res.forEach((item, ind) => {
    sortArry[ind] = [];
    sortArry[ind] = arrKey.splice(0, item.length);
  });

  //3.根据二维数组组装三维数组，根据第一个字段分组的结果对需要分组的数据进行相同的合并
  let newArr = [];
  sortArry.forEach((item, ind) => {
    let first = sortArry[ind][0];
    let index = 0;
    newArr[ind] = [];
    newArr[ind][index] = [];
    item.forEach((list, i) => {
      if (first === list) {
        newArr[ind][index].push(list);
      } else {
        index += 1;
        newArr[ind][index] = [];
        newArr[ind][index].push(list);
        first = list;
      }
    });
  });

  //4.三维数组转换处理成二维数组
  let getArry = [];
  newArr.forEach((list) => {
    list.forEach((i) => {
      getArry.push(i);
    });
  });

  //5.根据二维数组计算出rowSpan的占位
  let arrs = [];
  getArry.forEach((item) => {
    const len = item.length;
    for (let i = 0; i < len; i++) {
      arrs.push(i === 0 ? len : 0);
    }
  });

  //6.赋值每一行的rowSpan
  const obj = {
    children: value,
    props: {},
  };

  obj.props.rowSpan = arrs[index];
//   if(firstKey== 'funcIdentifier2'){
//       console.log(obj,'===========')
//   }
  return obj;
};