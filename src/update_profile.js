
import user from "./schema.js";

const updateProfile = async (req, res) => {
    // console.log(req.body);
    const new_name = req.body.name;
    const new_email = req.body.email;
    const user_mail = req.session.userData.email;
    console.log(user_mail);
    const result = await user.updateOne({ email: user_mail }, {
        $set : {
            name: new_name,
            email: new_email,
        }
    });
    console.log(result);
    res.send("Successfully updated");
}
export default updateProfile;

// app.get("/update_profile",(req,res)=> {
//     console.log(req.body);
//     res.send("newgf");
// })

// app.listen("3000", function() {
//     console.log("Server running ...");
// });