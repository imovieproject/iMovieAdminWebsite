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
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item style="width:100%" label="用户ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="用户名">
                            <span v-if="!isEditing">{{ props.row.name }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="注册日期">
                            <span>{{ props.row.register_time }}</span>
                        </el-form-item>
                        <el-form-item style="width:100%" label="邮件">
                            <span v-if="!isEditing">{{ props.row.email }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.email"></el-input>
                        </el-form-item>
                        <el-form-item style="width:100%" label="个性签名">
                            <span v-if="!isEditing">{{ props.row.description }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.description"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="用户ID" prop="id"/>
            <el-table-column label="用户名" prop="name"/>
            <el-table-column label="注册时间" prop="register_time"/>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="!isEditing">
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
                            <el-form-item label="用户ID">
                                <span>{{ formData.id }}</span>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <span>{{ formData.name }}</span>
                            </el-form-item>
                            <el-form-item label="注册日期">
                                <span>{{ formData.name }}</span>
                            </el-form-item>
                            <el-form-item label="邮件">
                                <span>{{ formData.name }}</span>
                            </el-form-item>
                            <el-form-item label="个性签名">
                                <span>{{ formData.name }}</span>
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
            @current-page="handlePageChange">
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
      .get(process.env.API_HOST + '/users', {
        params: {
          start: start,
          count: count
        }
      })
      .then(response => {
        this.tableData = response.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleCurrentExpand (row, expandedRows) {
      for (var i = 0; i < expandedRows.length - 1; i++) {
        this.$refs.table.toggleRowExpansion(expandedRows[i], false)
      }
      if (expandedRows.length === 1) {
        this.currentExpand = expandedRows[0]
      }
      if (this.isEditing) {
        row.editable = !row.editable
      }
    },
    handlePageChange (page) {
      var start = (page - 1) * 10
      var count = 10
      axios
        .get(process.env.API_HOST + '/users', {
          params: {
            start: start,
            count: count
          }
        })
        .then(response => {
          this.tableData = response.data
          for (var i = 0; i < this.tableData.length; i++) {
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
            axios
              .get(process.env.API_HOST + '/deluser/' + row.id)
              .then(response => {
                delete this.tableData[index]
                this.$message({
                  type: 'success',
                  message: '已成功删除'
                })
              })
          }
        }
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
      console.log(this.currentExpand)
      var url = process.env.API_HOST + '/modifyuser/' + this.currentExpand.id
      var data = this.currentExpand
      delete data['editable']
      console.log(url)
      axios.post(url, this.currentExpand)
        .then(response => {
          this.$message({
            type: 'info',
            message: '已修改用户信息'
          })
        })
    }
  }
}
</script>

<style>
.table-expand {
    font-size: 0;
}
.table-expand label {
    width: 90px;
    color: #99a9bf;
}
.table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.dialog-form label{
    width: 90px;
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
