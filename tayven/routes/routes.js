import express from 'express';
export const cartRouter = express.Router();
cartRouter.get("/", (req, res) => {
    res.render("cart", { // Later add rest of form data
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 105 1758"
    });
})
cartRouter.post("/order", (req, res) => {
    res.send("ordered");
})
cartRouter.post("/update", (req, res) => {
    res.send("updated");
})


