const express=require("express")
const parser=require("body-parser")
const mong=require("mongoose")
const ejs=require("ejs")
const app=new express();
const upload=require("express-fileupload");
const fast2sms = require('fast-two-sms');




app.use(upload());
app.use(express.static("public"))
app.set("view engine" ,ejs);


app.use(parser.urlencoded({extended:true}));




mong.connect("mongodb+srv://kaushikji:ebY6914I37pP7fJo@cluster0.f6fro.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true},function(err){
    
    
    if(err){
        console.log(err);    }
});


require('dotenv').config();






const jobschema=new mong.Schema(
{
   
   name:String,
  cropage:Number,
  cropcost:Number,
    city:String,
    category:String,
  weight:Number,
    mobile:Number
    
    
})





const memberschema=new mong.Schema({
    
    name:String,
  adress:String,
    email:String,
    mobile:Number,
    passward:String,
    appliedto:[String]
    
})

const user=mong.model("user",memberschema);

const jobpost=mong.model("post",jobschema);
//jai shree ram


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);



app.get("/",function(req,res){
   
console.log("jai shreer ram"); 

  
jobpost.find(function(err,result){
    if(!err){
        console.log("jai shree ram we have got the request")
        

   res.render("home_page_wo_log_in.ejs",{ray:result});
    }
    })    
});

app.get("/about",function(req,res){
    
  
    res.render("balaji.ejs")
    
    
})
app.get("/signin",function(req,res){
    
    res.render("login.ejs" ,{ray:"true"})
})

app.post("/signin",function(req,res){
    
    const Email=req.body.email;

    user.find({email:Email,passward:req.body.psw},function(err,nesult){
        
        
        if(!err){
            if(nesult.length>0){
           
                
           jobpost.find(function(err,result){
    
 

               
               
    res.render("newshome.ejs",{ray:result,gay:nesult[0].name,id:nesult[0]._id})
               
    
})
  
            
            
            }
            else{
                
                
             res.render("login.ejs",{ray:"false"})

                
                
            }
            
            
            
        }
    })
    
    
})







app.get("/signUp",function(req,res){
    
    
    res.render("signup.ejs",{cond:"true"});
})



app.post("/signUp",function(req,res){
//    if(req.files){
    

    user.find({email:req.body.email},function(err,result){
        if(result.length==0){
          
    
 
     var newuser=new user({
            
            name:req.body.name,
            adress:req.body.lname,
            email:req.body.email,
            passward:req.body.pswfirst,
         mobile:req.body.mobile
          
            
            
        })
        newuser.save();
             res.render("login.ejs",{ray:"true"})
            
        }
        else(
        
        res.render("signup.ejs",{cond:"false"})
        
        )
        
        
        
    })
    
   
       
    
   

   
    
    
    
    
})

app.get("/postjob",function(req,res){
    
    res.render("postjob.ejs")
   
    
    
    
})


app.post("/newpost",function(req,res){
    
   
   

 
    const newjobpost=new jobpost(
{
    
    
     name:req.body.name,
  cropage:req.body.cropage,
  cropcost:parseInt( req.body.price),
    city:req.body.city,
    category:req.body.category,
  weight:parseInt(req.body.weight),
    mobile:req.body.mobile
    
    
})
    var months=[1120,2500,4500,7800];
   

const random = Math.floor(Math.random() * months.length);

    
    var options = {authorization : "SxVtdcwVgEYXW04WSzsihKVrkTJFmzqyneE2AonZ6uxtPSdcYxAyLfTG7Fhy" ,
                   message :"Hello  "+req.body.name +" your otp for Crop listing at deshmandi.online is" +months[random]+"Dont share it with anyone"
                   ,  numbers :[req.body.mobile]}
    
 

    
    fast2sms.sendMessage(options).then(response=>{
        
          newjobpost.save(function(err){
        
        if(!err){
   res.render("otp.ejs")
            
}
        else(
            res.send("something went wrong please refresh to home page")
        )
})
    
    })
    
});

app.post("/otpsend",function(req,res){
   
    var months=[1120,2500,4500,7800]
    if(months.indexOf(parseInt(req.body.otp)) !== -1){
      
   jobpost.find(function(err,result){
    
   
    res.render("home_page_wo_log_in.ejs",{ray:result})
      
}) 
    } else{
       
     res.render("otp.ejs")
    }
    
    
})




//search the job without login
app.post("/findcrop",function(req,res){
         

    const city=req.body.city;
    const category=req.body.category;
   

    jobpost.find({city:city},function(err,result){
    
    if(!err){

    res.render("result_wss.ejs",{raye:result})
    }
    
    else{
        
        
        res.send(err);
    }
})
    

         
         
         });


//search the job with log in
app.post("/searchjoblog",function(req,res){
         
 
    const id=req.body.id;
    const name=req.body.name;

    const city=req.body.city;
  
    const category=req.body.category;
    
   
         
  
         jobpost.find({city:city},function(err,result){
  
    

    res.render("results_withsign.ejs",{raye:result,name:name,city:city,id:id})
    
})
    
         



         
         
         });






app.post("/recent_update_with_signin",function(req,res){
    

    
   

       
    user.findById(req.body.detailofmerchant,function(err,nesult){
    
                
                jobpost.findById(req.body.detailoffarmer,function(err,resul){
                
                    var options = {authorization :"SxVtdcwVgEYXW04WSzsihKVrkTJFmzqyneE2AonZ6uxtPSdcYxAyLfTG7Fhy"  ,
                   message : "Hello! " +resul.name+ " we hope you are doing well ."+ nesult.name +" has shown Intrest in your crop Listing @deshmandi.online kindly contact them @ "+ nesult.mobile+ " "
                   ,  numbers :[resul.mobile]}
    
 

    
    fast2sms.sendMessage(options).then(response=>{
        if(response.return){
      jobpost.find(function(err,result){
    res.render("newshome.ejs",{ray:result,gay:nesult.name,id:nesult._id})
})
        }
    }) 
                })
           
                
           
        
    })
    
    
})

app.post("/wanobuy",function(req,res){


     user.findById(req.body.id_of_merchant, function(err, mer_res){
   
jobpost.findById(req.body.id_ofcrop,function(error,crop_res){

    var number=mer_res.mobile.toString();
   
    var options = {authorization : "SxVtdcwVgEYXW04WSzsihKVrkTJFmzqyneE2AonZ6uxtPSdcYxAyLfTG7Fhy" ,
                   message : "Hello! " +crop_res.name+ " we hope you are doing well ."+ mer_res.name +" has shown Intrest in your crop Listing @deshmandi.online kindly contact them @ "+ number+ " "
                   ,  numbers :[crop_res.mobile]}
    
 
  fast2sms.sendMessage(options).then(response=>{
    jobpost.find({city:crop_res.city},function(err,results){
           
           if(!err){
    res.render("results_withsign.ejs",{raye:results,name:mer_res.name,city:crop_res.city,id:mer_res._id})
           }
    
})
    })
    
     
         
     }
      
     
  

  
     )});
    
    
});




// Step 1

// Step 2
 
// Step 3


