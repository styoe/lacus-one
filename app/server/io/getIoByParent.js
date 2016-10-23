module.exports = function (list, parentId) {
    let newList = list.reduce(function (acc, item) {
        if (item.parentId === parentId) {
          acc.push(item);
        }

        return acc;
      }, []);

    return newList.sort((a, b) => a.order - b.order);
  };
