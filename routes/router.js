const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
   console.log(req);
      res.send("{message:'Welcome to my site'}");
});

module.exports=router;