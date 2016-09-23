module.exports = function(list, parent_id){
    let new_list = list.reduce(function(acc, item){
        if(item.parent_id === parent_id){
            acc.push(item);
        }
        return acc;
    }, []);

    return new_list.sort((a, b) => a.order - b.order);
};