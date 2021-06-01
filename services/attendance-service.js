const fs=require('fs');
const path=require('path');

module.exports.processImages=async (data,files)=>{
   console.log(data,files)
     return  {
        status:true,
        data:"Empty",
        message:"Okay"
     }
}

module.exports.getAllAttendance=(req)=>{
   const fdir=path.join(__dirname,'../','faceRecognizer/Attendance');
   var result=[];
   fs.readdirSync(fdir).forEach((file)=>{
      var data=fs.readFileSync(path.join(__dirname,'../','faceRecognizer/Attendance',file),'utf-8');
      var chunks=data.split('\r\n');
      for(var i=1;i<chunks.length-1;i++)
      {
         var row=chunks[i].split(',');
         var id=row[0];
         var name=row[1];
         console.log(id,name);
         var doc={};
         doc.id=id;
         doc.name=name;
         result.push(doc);
      }
   });
   console.log(result);
   return  {
      status:true,
      data:result,
      message:"Okay"
   }

}
module.exports.getAllAttendance('sds')