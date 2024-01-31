const express=require("express")
const parser=require("body-parser")
const mong=require("mongoose")
const ejs=require("ejs")
const app=new express();
const upload=require("express-fileupload");
const fast2sms = require('fast-two-sms');
const cors = require("cors")
const nodemailer = require("nodemailer")




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

const productschema=new mong.Schema({


Name:String,
Category:String,
Status:String,
icon:String


});

const bannerschema=new mong.Schema({



    Image:String,
    Status:String
});

const offerschema=new mong.Schema({


Image:String,
Content:String,
Offer:String


});
const Trendingschema=new mong.Schema({

Image:String,
Content:String


})

const categoryschema=new mong.Schema({
    Image:String,
Content:String



})
const Category=mong.model("category",categoryschema);


const TrendingOffer=mong.model("TrendingOffer",Trendingschema);

const offer=mong.model("offer",offerschema);

const product=mong.model("products",productschema);

const banner=mong.model("banners",bannerschema);

const user=mong.model("user",memberschema);

const jobpost=mong.model("post",jobschema);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);



app.get("/",function(req,res){
   


  
jobpost.find(function(err,result){
    if(!err){
        console.log(" we have got the request to the roor Directory");
        

   res.render("home_page_wo_log_in.ejs",{ray:result});
    }
    })    
});

app.get("/about",function(req,res){
    
  
    res.render("about.ejs")
    
    
})
app.get("/signin",function(req,res){
    
    res.render("login.ejs" ,{ray:"true"})
})
app.get("/forpas",function(req,res){

res.render("forgot.ejs");
console.log(req.body);



});


app.post('/forpas',function(req,res){
console.log("a request has been therein the system");
    console.log(req.body);
	const transport = nodemailer.createTransport({
		service:"gmail",
		host: "smtp.gmail.com",
		port: 465,
		auth: {
			user: "automater420@gmail.com",
			pass: "hrszqqhjzejspvjx"
		}
	})
	console.log(transport)

	transport.sendMail({
		from: "dm29phase1@gmail.com",
		to: req.body.email,
		subject: "Meeting Nofication",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your metting link</h2>
		<h3>Hi your ${req.body.Company} Meeting has been schedule for ${req.body.Schedule} Please Join by Clicking on the Below Link</h3>
		<a href=${req.body.Link}>${req.body.Link}</a>
        <br>
	    <span>Siddhant Kaushik<br>AllSafe<span>
         </div>
    `
	}).then((result)=>{
     console.log(result);
		res.render("otp.ejs");



});
});

app.post('/update',function(req,res){
console.log(req.body);
user.find({"email":req.body.email},function(err,Result){


    console.log(Result);
})
    user.updateOne({"email":req.body.email},{"email":req.body.email,"passward":req.body.pass},function(reqest,response){
  res.send("ok password chahged succesfully");
    })
    
})
app.post("/signin",function(req,res){
    
    const Email=req.body.email;
    user.find({email:Email,passward:req.body.psw},function(err,nesult){
        
        
        if(!err){
            if(nesult.length>0){
           
                
           jobpost.find(function(err,result){
    
 

               
               
    // res.render("newshome.ejs",{ray:result,gay:nesult[0].name,id:nesult[0]._id})
    res.send("you have succesfull logind in to Your Account");
               
    
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
    console.log(req);
    res.send("hello");
//    if(req.files){
    

    // user.find({email:req.body.email},function(err,result){
    //     if(result.length==0){
          
    
 
    //  var newuser=new user({
            
    //         name:req.body.name,
    //         adress:req.body.lname,
    //         email:req.body.email,
    //         // passward:req.body.pswfirst,
    //      mobile:req.body.mobile
          
            
            
    //     })
    //     newuser.save();
    //          res.render("login.ejs",{ray:"true"})
            
    //     }
    //     else(
        
    //     res.render("signup.ejs",{cond:"false"})
        
    //     )
        
        
        
    // })
    
   
       
    
   

   
    
    
    
    
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
   console.log("we are the greatest in the word");
    var months=[1120,2500,4500,7800]
    if(months.indexOf(parseInt(req.body.otp)) !== -1){
      
   jobpost.find({"email":'varsha@gmail.com'},function(err,result){
    
   
    res.render("update.ejs",{ray:result})
      
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
                
                    var options = {authorization :"ksSQFqgTcu3MJpCXKEf07HvD1GZIhb9YOznyBVwxP54mel6Uaj0XKC4u6FWLHgPDmwoR7VEyBjs9lTGb"  ,
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
    
    
});

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




app.post("/updati",(req,res)=>{


console.log(req.body);

user.updateOne({"email":req.body.email},{$set:{"email":req.body.email,"passward":req.body.passward,"name":req.body.name,"mobile":req.body.mobile}},function(result,response){
  console.log(result);
  console.log(response);
    res.send("data updated succesfully");
      })

})



app.post("/product/create",(req,res)=>{


    const newjobpost=new product(
        {
            
            Name:req.body.Name,
            Category:req.body.Category,
            Status:req.body.Status,
            icon:req.body.Icon
    
            
        });
        newjobpost.save();

product.find((result,err)=>{

console.log(result);




})

});



app.get("/product/show",(req,res)=>{


    product.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/product/Update",(req,res)=>{

product.updateOne({"_id":req.body.id},{"Name":req.body.Name,"Category":req.body.Category,"Status":req.body.Status,"Icon":req.body.Icon},function(result,response){

    console.log(response);
    console.log(result);

});
res.send("update succefully");

})


app.post("/product/delete",(req,res)=>{

product.deleteOne({"_id":req.body.id},function(response,result){

console.log(result);

})

res.send("deleted Successfully");

});



app.post("/banner/create",(req,res)=>{


    const newjobpost=new banner(
        {
            
          Image:req.body.Image,
          Status:req.body.Status
    
            
        });
        newjobpost.save();

banner.find((result,err)=>{

console.log(result);

res.send("created Succesfully");


})

});



app.get("/banner/show",(req,res)=>{


    banner.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/banner/Update",(req,res)=>{

banner.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Status":req.body.Status},function(result,response){

    console.log(response);
    console.log(result);

});
res.send("update succefully");

})


app.post("/banner/delete",(req,res)=>{

banner.deleteOne({"_id":req.body.id},function(response,result){

console.log(result);

})

res.send("deleted Successfully");

});




// offer api
app.get("/offer/show",(req,res)=>{


    offer.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/offer/Update",(req,res)=>{

    offer.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("update succefully");
    
    })
app.post("/offer/create",(req,res)=>{


        const newjobpost=new offer(
            {
                
              
Image:req.body.Image,
Content:req.body.Content,
Offer:req.body.Offer

        
                
            });
            newjobpost.save();
    
    offer.find((result,err)=>{
    
    console.log(result);
    
    res.send("created Succesfully");
    
    
    })
    
    });
    
//Trending offer

app.get("/TrendingOffer/show",(req,res)=>{


    TrendingOffer.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   

});

app.post("/TrendingOffer/Update",(req,res)=>{

    TrendingOffer.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("update succefully");
    
    })

app.post("/TrendingOffer/create",(req,res)=>{


        const newjobpost=new TrendingOffer(
            {
                
              
Image:req.body.Image,
Content:req.body.Content,

        
                
            });
            newjobpost.save();
    
            TrendingOffer.find((result,err)=>{
    
    console.log(result);
    
    res.send("created Succesfully");
    
    
    })
    
    });

app.post("/otp/verify",(req,res)=>{

if(req.body.otp==1120){

res.send("verified Scuccefully");

}
else{

    res.send("Try Again")
}



});


app.get("/category/show",(req,res)=>{

    Category.find((err,results)=>{

        console.log(results);
        
        res.send(JSON.stringify(results));
        
        
        });
   


});

app.post("/category/create",(req,res)=>{


    const newjobpost=new Category(
        {
            
          
Image:req.body.Image,
Content:req.body.Content,

    
            
        });

        newjobpost.save();

        Category.find((result,err)=>{

console.log(result);

res.send("created Succesfully");



})

});

app.post("/category/update",(req,res)=>{

Category.updateOne({"_id":req.body.id},{"Image":req.body.Image,"Content":req.body.Content},function(result,response){
    
        console.log(response);
        console.log(result);
    
    });
    res.send("updated succefully");

    

})