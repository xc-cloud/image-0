/**
 * 此模块需要privatespace权限，如果没有，那么无法使用本模块
 */
 function aboutExpandNotePad() {

}
aboutExpandNotePad.prototype = {
    //获取列表数据
    /**
     * 获取指定数据
     * @param {JSON} option  {pageNumber = 1, pageSize = 30, append = false}起始页,每页数量,如果存在多页，是否连续拉取
     * @param {*} callback 回调函数，如果append为true，那么该回调将会被调用多次
     */
    get(option, callback) {
        let opt = {
            pageNumber : option.page || 1,
            pageSize : option.size || 30,
            append : option.append || false
        }
        let that = this
        $.get(`/markdown/aboutExpand/get?pageNumber=${opt.pageNumber}&pageSize=${opt.pageSize}`, function(data) {
            data = e.data
            if (data.result.length > 0) {
                setTimeout(function() {
                    callback(data.result)
                }, 100)
            }
            if (data.result.length == opt.pageSize) {
                opt.pageNumber += 1
                that.get(opt, callback)
            }
        })
    },
    /**
     * 添加或修改对应值，如果存在id，那么修改，不存在id那么新增
     * @param {*} body 
     * @param {*} id 
     */
    addOrUpdate(body, id, callback) {
        let bf = id == null ? "新增" : "修改"
        $.post("/markdown/aboutExpand/addOrUpdate", {
            body:body,
            id:id,
            open:1
        }, function(e) {
            modal.check(e.code == 200, bf + "成功", bf + "失败")
            e.code == 200 && callback(e.data)
        })
    },
    del(id, callback) {
        $.post("/markdown/aboutExpand/del/" + id, {}, function(e) {
            modal.check(e.code == 200, "删除成功", "删除失败")
            e.code == 200 && callback()
        })
    }

}
