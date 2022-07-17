const mongoose = require('mongoose');
const Category = require('../../models/Category');
// const Content = require('../../models/Content') 
const categoryDao = require('../../daos/categoryDao/categoryDao')
const userDao = require('../../daos/userDao/userDao')

const getCategories = async (res) => {
    try {
        //get all categories
        let categories = await Category.find({});

        return res.status(200).json({
            success: true,
            data: {
                msg: 'Categories retrieved successfully',
                data: categories
            },
            code: 200
        })
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }

}
const createNewCategory = async (userId, data, res) => {
    try {
        console.log({ data })
        let newCategory = new Category({
            _id: new mongoose.Types.ObjectId(),
            name: data.name,
            userId: userId,
            value: data.value,
            subCategories: [],
            description: data.description,
            categoryType: data.categoryType
        });
        let category = await newCategory.save();

        return res.status(200).json({
            success: true,
            data: {
                id: category._id,
                msg: 'Category created successfully',
            },
            code: 200
        })
    } catch (err) {
        console.error('Error occurred trying to get info', err);
        res.status(500).send('An error has occurred');
    }
}
const setUserCurrentCategory = async (req, data, res) => {
    const {category_id} = data
    if(category_id){
      try{
       const category = await categoryDao.getCategoryById(category_id)
       if(category){
         console.log('user',req.userData)
        const result =  await userDao.editUserInfo(req.userData.data,{currentCategory:category._id})
        console.log('result', result);
       return res.status(200).json({msg:'Succesfully set current category for user',code:200});
       }else{
         res.status(404).json({msg:'category not found',code:404})
       }
      }catch(e){
       res.status(500).json({msg:'Internal server error',code:500})
      }
  
     
    }else{
      res.status(400).json({msg:'Bad Request'})
    }
       

 
}


module.exports = {
    getCategories,
    createNewCategory,
    setUserCurrentCategory
}