import express from 'express';
import { getAllProducts,getAllHomeProducts,createProduct, updateProduct, deleteProduct, getProductDetails,createProductReview, getProductReviews, deleteReview, getAdminProducts } from '../controllers/Product.js';
import  {isAuthantication ,authoriseRoles} from '../middlewear/auth.js';


const router= express.Router();

router.route("/products").get(getAllProducts)
router.route("/home/products").get(getAllHomeProducts)
router.route("/admin/products").get( isAuthantication,authoriseRoles("admin"),getAdminProducts)
router.route("/admin/product/new").post(isAuthantication,authoriseRoles("admin"),createProduct )
router.route("/admin/product/:id").put(isAuthantication,authoriseRoles("admin"),updateProduct).delete(isAuthantication,authoriseRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthantication,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthantication,deleteReview)

export default router;