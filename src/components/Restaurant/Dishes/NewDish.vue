<template>
    <div　id="NewDish">
        <el-container>
            <el-header>
            <p>创建菜品</p>
            </el-header>

            <el-container id="bottom">
                <el-main>
                    <el-form ref="newDishForm" :model="new_dish" label-width="80px" :rules="rules">

                    <el-form-item label="菜品名称" prop="dish_name">
                    <el-input v-model="new_dish.dish_name"></el-input>
                    </el-form-item>

                    <el-form-item label="价格" prop="price">
                    <el-input v-model.number="new_dish.price"></el-input>
                    </el-form-item>

                    <el-form-item label="口味" prop="flavor">
                    <el-input v-model="new_dish.flavor"></el-input>
                    </el-form-item>

                    <el-form-item label="所属品类" prop="category_id">
                    <el-select v-model="new_dish.category_id" placeholder="请选择品类">
                    <el-option v-for="(category, index) in CategoriesArray" :label="category.category_name" :key="category.category_id" :value="category.category_id"></el-option>
                    </el-select>
                    </el-form-item>

                    <el-form-item label="详情介绍" prop="description">
                    <el-input type="textarea" v-model="new_dish.description"></el-input>
                    </el-form-item>

                    <el-form-item>
                    <el-button type="primary" @click="submitForm('newDishForm')">立即创建</el-button>
                    <el-button @click="resetForm('newDishForm')">取消</el-button>
                    </el-form-item>
                    </el-form>

                </el-main>
                <el-aside width="40%">
                    <el-upload id="uploadImagePart" :auto-upload="false" action="/api/v1/menu/dish" name="avatar" :data="new_dish" :file-list="imageList" :show-file-list="false" ref="upload" :on-change="onImageChange" :on-success="onImageUploadSuccess" :on-error="onImageUploadFailed">
                        <img v-if="image_local_url" :src="image_local_url" class="avatar">
                        <div id="hint" v-if="!image_local_url">           
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><em>点击上传</em>菜品图片</div>
                        </div>
                    </el-upload>

                </el-aside>
            </el-container>
        </el-container>

    </div>
</template>

<script type="text/javascript">

var axios = require('axios');

export default {
    data: function() {
        var checkPrice = (rule, value, callback) => {             
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                } else {
                    if (value < 0) {
                        callback(new Error('价格不能小于0'));
                    } else {
                        callback();
                    }
                }
            }, 0);
        };

        return {
            new_dish: {
                dish_name: "",
                price: "",
                flavor: "",
                description: "",
                category_id: ""
            },

            imageList: [],
            image_local_url: "",

            rules: {
                dish_name: [
                    { required: true, message: '菜品名称不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '价格不能为空', trigger: 'blur' },
                    { type: 'number', message: '价格必须为数字值', trigger: 'blur' },
                    { validator: checkPrice, trigger: 'blur' }
                ],
                flavor: [
                    { required: true, message: '菜品口味不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在1到20个字符', trigger: 'blur' }
                ],
                category_id: [
                    { required: true, message: '请选择所属品类', trigger: 'change' }
                ],
                description: [
                    { required: true, message: '请填写菜品介绍', trigger: 'blur' }
                ]
            },

            
            CategoriesArray: []
        }
    },

    mounted () {
        axios.get('/api/v1/menu').then(response => {this.CategoriesArray = response.data.data});
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    var that = this;

                    if (!that.image_local_url) {
                        that.$message({
                            type: 'error',
                            message: '请上传菜品图片'
                        });
                    } else {
                        that.$refs.upload.submit();
                    }

                        // axios.post('/api/v1/menu/dish', {
                     //           dish_name: this.new_dish.dish_name,
                     //           price: this.new_dish.price,
                     //           flavor: this.new_dish.flavor,
                     //           description: this.new_dish.description,
                     //           category_id: this.new_dish.category_id
                     //         })
                     //         .then((response) => {
                     //           that.$message({
                      //            type: 'success',
                      //            message: response.data.msg
                      //          });

                      //        console.log(response);
                              
                     //         })
                     //         .catch((error) => {
                     //           that.$message({
                      //            type: 'error',
                      //            message: error.response.data.errmsg
                      //          });
                              
                       //     console.log(error.response);
                       //   });
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });

        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        onImageChange(file, fileList) {
            // console.log(file);
            this.image_local_url = file.url;
            this.imageList = fileList.slice(-1);
            
        },

        onImageUploadSuccess(res, file) {
            console.log(res);
            this.$message({
                type: 'success',
                message: res.msg
            });

            this.$router.replace({path: '/home/dishes'});
        },

        onImageUploadFailed(res, file) {
            console.log(res);
        }



    }
  }
</script>

<style scoped>

    #NewDish {
        /*margin: 15px 6px;*/
        border: 1px solid, #BFBFBF;
        box-shadow: 0px 0px 5px #888888;
        background-color: white;
        min-height: 100%;
        padding: 10px;  
    }

    #bottom .el-aside {
        margin: 20px;
        margin-left: 0;
    }

    .el-form-item {
        width: 85%;
    }

    #uploadImagePart {
        width: 220px;
        height: 220px;

        border: 1px solid #BFBFBF;
        box-shadow: 0px 0px 2px #888888;
        border-radius: 6px;

        cursor: pointer;
        position: relative;
        overflow: hidden;

        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }


    p {
        text-align: left;
        font-size: 20px;
        font-weight: normal;
        margin: 0;
    }

    .el-select {
        width: 100%;
    }


    .el-icon-upload {
        font-size: 50px;
        color: #8c939d;
        text-align: center;
    }

    div#hint {  
        color: black;
    }

    div#hint em {
        color: #409EFF;
    }

    #uploadImagePart img {
        width: 100%;
        height: 100%;
    }
</style>