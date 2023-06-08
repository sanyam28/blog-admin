import Session from "../../../models/Session"
import dbConnect from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        const cses = await Session.findOne({token: req.body.sessiontoken})
        if(cses){
            const deletesession = await Session.deleteOne({token: cses.token})
            if(deletesession){
                res.json({"success": "deleted"})
            }
            else{
                res.json({"success": "something went wrong"})
            }
        }
        else{
            res.json({"success": "already deleted"})
        }
            res.json({"success": "deleted"})
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
