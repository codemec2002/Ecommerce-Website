const updateProfile = (req, res) => {
    // console.log(req);
    console.log(req.body);
    res.send("update profile new");
}
export default updateProfile;

// app.get("/update_profile",(req,res)=> {
//     console.log(req.body);
//     res.send("newgf");
// })

// app.listen("3000", function() {
//     console.log("Server running ...");
// });