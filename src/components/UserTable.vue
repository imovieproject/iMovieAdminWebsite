<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            ref="table"
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="用户ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <span v-if="!isEditing">{{ props.row.name }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="注册日期">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="邮件">
                            <span v-if="!isEditing">{{ props.row.name }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.name"></el-input>
                        </el-form-item>
                        <el-form-item label="个性签名">
                            <span v-if="!isEditing">{{ props.row.name }}</span>
                            <el-input v-if="isEditing"  v-model="props.row.name"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="用户ID" prop="id"/>
            <el-table-column label="用户名" prop="name"/>
            <el-table-column label="注册时间" prop="shop"/>
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
            :total="50">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isReadOnly: false,
      isEditing: false,
      dialogFormVisible: false,
      formData: {},
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987127',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  methods: {
    editBtnClicked (index, row) {
      console.log(index, row)
      this.isEditing = true
      this.$refs.table.toggleRowExpansion(row, true)
    },
    delBtnClicked (index, row) {
      console.log(index, row)
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
      this.$refs.table.toggleRowExpansion(row, false)
    },
    saveBtnClicked (index, row) {
      this.formData.id = row.id
      this.formData.name = row.name
      this.dialogFormVisible = true
    },
    comfirmChangeBtnClicked () {
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
</style>
