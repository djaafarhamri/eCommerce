const { Router } = require("express");
const productController = require("../Controllers/productController.js");
const { requireAuth, checkUser, requireAdmin } = require('../midllewares/authMidlleware')
const router = Router();

router.post("/addProduct", requireAdmin, productController.addProduct);
router.post("/updateProduct/:id", requireAdmin, productController.updateProduct);
router.post("/deleteProduct/:id", requireAdmin, productController.deleteProduct);
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getAllProductsByCategory/:category", productController.getAllProductsByCategory);
router.get("/getAllProductsBySubCategory/:subCategory", productController.getAllProductsBySubCategory);
router.get("/getProductByTitle/:title", productController.getProductByTitle);

module.exports = router;
