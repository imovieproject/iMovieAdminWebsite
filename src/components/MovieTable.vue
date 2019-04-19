<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="table"
            highlight-current-row
            @current-change="handleCurrentChange"
            @expand-change="handleCurrentExpand"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand" :form="formData">
                        <el-form-item style="width:100%" label="电影ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影评分">
                            <span>{{ props.row.rating.average }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="评分人数">
                            <span>{{ props.row.rating.rating_people }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影名">
                            <span v-if="!props.row.editable">{{ props.row.title }}</span>
                            <el-input style="width:100%" v-else  v-model="props.row.title"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影类型">
                            <span v-if="!props.row.editable">{{ props.row.genresStr }}</span>
                            <el-input v-else v-model="props.row.genresStr"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影导演">
                            <span v-if="!props.row.editable">{{ props.row.directorsStr }}</span>
                            <el-input v-else  v-model="props.row.directorsStr"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影演员">
                            <span v-if="!props.row.editable">{{ props.row.castsStr }}</span>
                            <el-input v-else v-model="props.row.castsStr"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="电影详情">
                            <span v-if="!props.row.editable">{{ props.row.summary }}</span>
                            <el-input type="textarea" v-else  v-model="props.row.summary"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="电影ID" prop="id"/>
            <el-table-column label="电影名" prop="title"/>
            <el-table-column label="类型" prop="genresStr"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="!scope.row.editable">
                        <el-button size="mini" @click="editBtnClicked(scope.$index,scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delBtnClicked(scope.$index,scope.row)">删除</el-button>
                    </div>
                    <div v-else>
                        <el-button size="mini" @click="cancelBtnClicked(scope.$index,scope.row)">取消</el-button>
                        <el-button size="mini" type="success" @click="saveBtnClicked(scope.$index,scope.row)">保存</el-button>
                    </div>
                    <!-- 保存修改时弹出，确认更改 -->
                    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
                        <el-form :form="formData" class="dialog-form">
                            <el-form-item style="width:100%" label="电影名">
                                <span>{{ formData.title }}</span>
                            </el-form-item>
                            <el-form-item style="width:100%" label="电影类型">
                                <span>{{ formData.genresStr }}</span>
                            </el-form-item>
                            <el-form-item style="width:100%" label="电影导演">
                                <span>{{ formData.directorsStr }}</span>
                            </el-form-item>
                            <el-form-item style="width:100%" label="电影演员">
                                <span>{{ formData.castsStr }}</span>
                            </el-form-item>
                            <el-form-item style="width:100%" label="电影详情">
                                <span>{{ formData.summary }}</span>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button  @click="dialogFormVisible=false">取消</el-button>
                            <el-button type="primary" @click="comfirmChangeBtnClicked">确定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="totalRecords"
            @current-change="handlePageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      totalRecords: 0,
      // 当前选中的行
      currentRow: null,
      // 当前展开的行
      currentExpand: null,
      isReadOnly: false,
      isEditing: false,
      dialogFormVisible: false,
      formData: {},
      // 一页显示10条数据
      tableData: []
    }
  },
  created () {
    var start = 0
    var count = 10
    axios
      .get(process.env.API_HOST + '/movies', {
        params: {
          start: start,
          count: count
        }
      })
      .then(response => {
        this.tableData = response.data
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].castsStr = this.getCastString(this.tableData[i].casts)
          this.tableData[i].genresStr = this.getMovieTypeString(this.tableData[i].genres)
          this.tableData[i].directorsStr = this.getDirectorString(this.tableData[i].directors)
          this.tableData[i].editable = false
        }
      })
      .catch(err => {
        console.log(err)
      })

    axios
      .get(process.env.API_HOST + '/totalmovie')
      .then(response => {
        console.log(response)
        this.totalRecords = response.data
      })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleCurrentExpand (row, expandedRows) {
      console.log(row)
      for (var i = 0; i < expandedRows.length - 1; i++) {
        this.$refs.table.toggleRowExpansion(expandedRows[i], false)
      }
      if (this.isEditing) {
        row.editable = !row.editable
      }
    },
    handlePageChange (page) {
      var start = (page - 1) * 10
      var count = 10
      axios
        .get(process.env.API_HOST + '/movies', {
          params: {
            start: start,
            count: count
          }
        })
        .then(response => {
          this.tableData = response.data
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].castsStr = this.getCastString(this.tableData[i].casts)
            this.tableData[i].genresStr = this.getMovieTypeString(this.tableData[i].genres)
            this.tableData[i].directorsStr = this.getDirectorString(this.tableData[i].directors)
            this.tableData[i].editable = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    editBtnClicked (index, row) {
      this.$refs.table.toggleRowExpansion(row, true)
      this.tableData[index].editable = true
      this.isEditing = true
    },
    delBtnClicked (index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action, instance) => {
          if (action === 'confirm') {
          }
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancelBtnClicked (index, row) {
      this.isEditing = false
      this.tableData[index].editable = false
      this.isEditing = false
    },
    saveBtnClicked (index, row) {
      this.formData = row
      this.dialogFormVisible = true
    },
    comfirmChangeBtnClicked () {
      this.isEditing = false
      this.dialogFormVisible = false
      var data = Object.assign({}, this.currentRow)
      // 删除后来添加的一些字段
      delete data.castsStr
      delete data.genresStr
      delete data.directorsStr
      delete data.editable
      var url = process.env.API_HOST + 'modifymovie/' + data.id
      console.log(url)
      axios.post(url, data)
        .then(response => {
          this.$message({
            type: 'info',
            message: '已修改电影信息'
          })
        })
    },
    getDirectorString: function (directors) {
      if (directors) {
        var directorList = ''
        var i = 0
        for (; i < directors.length - 1; i++) {
          directorList += directors[i].name + '/'
        }
        directorList = directorList + directors[i].name
        return directorList
      }
    },
    getCastString: function (casts) {
      if (casts) {
        var castStr = ''
        var i = 0
        for (;i < casts.length - 1; i++) {
          castStr += casts[i].name + '/'
        }
        castStr += casts[i].name
        return castStr
      }
    },
    getMovieTypeString: function (genres) {
      if (genres) {
        var typeStr = ''
        var i = 0
        for (;i < genres.length - 1; i++) {
          typeStr += genres[i] + '/'
        }
        typeStr += genres[i]
        return typeStr
      }
    }
  },
  computed: {

  }
}
</script>

<style>
.table-expand {
    font-size: 0;
}
.table-expand label {
    width: 100px;
    color: #99a9bf;
}
.table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.dialog-form label{
    width: 100px;
    color: #99a9bf;
}

.dialog-form .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.el-form-item__content{
  width: 90%
}
</style>
