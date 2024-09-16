
import { Notification } from "../models/notificationAdmin.js";
import { PendingProductModel } from "../models/PendingProductModelByUser.js";
import { $ProductModel } from "../models/productsModel.js";
import { User } from "../models/userModel.js";
import nodemailer from "nodemailer";

export const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      recipient: req.tokenVerifyId, 
    })
      .sort({ createdAt: -1 })
      .populate('recipient', 'fname lname email'); 

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password,
  },
});
export const approvedProduct = async (req, res) => {
  try {
    const { productId, notificationId } = req.params; // Expecting both IDs from request params
    const product = await PendingProductModel.findByIdAndUpdate(
      productId,
      { status: 'Approved' },
      { new: true }
    );

    if (!product) throw new Error("Product not found.");

    const user = await User.findById(product.addedBy);
    if (!user) throw new Error("User not found.");

    // const userNotification = new Notification({
    //   userId: user._id,
    //   title: "Product Approved",
    //   message: `Your product titled "${product.title}" has been successfully added.`,
    //   recipient: user._id,
    //   products: {
    //     productId: product._id,
    //     category: product.category,
    //     fields: product.fields,
    //     img1: product.img1,
    //     img2: product.img2,
    //     img3: product.img3,
    //     img4: product.img4,
    //     img5: product.img5,
    //     title: product.title,
    //     price: product.price,
    //     discount: product.discount,
    //     discription: product.discription,
    //   },
    // });

    // await userNotification.save();

    // Add the product to the catalog
    const newProduct = new $ProductModel({
      category: product.category,
      fields: product.fields,
      img1: product.img1,
      img2: product.img2,
      img3: product.img3,
      img4: product.img4,
      img5: product.img5,
      title: product.title,
      price: product.price,
      ratings: product.ratings,
      discount: product.discount,
      qnt: product.qnt,
      discription: product.discription,
    });

    await newProduct.save();

    // Delete the notification
    await Notification.findByIdAndDelete(notificationId);
  // Prepare the email content
  const mailOptions = {
    from: process.env.Email_User, // Sender email
    to: user.email, // Recipient email (user who added the product)
    subject: 'Product Approved: ' + product.title,
    text: `Dear ${user.fname},\n\nWe are pleased to inform you that your product titled "${product.title}" has been approved and is now live on our website.\n\nYou can view your product here: [Link to Product Page].\n\nThank you for contributiFng to our platform!\n\nBest Regards,\nThe Team`,
    html: `
      <h3>Dear ${user.fname},</h3>
      <p>We are pleased to inform you that your product titled <strong>"${product.title}"</strong> has been approved and is now live on our website.</p>
      <p><a href="http://yourwebsite.com/product/${newProduct._id}">Click here to view your product</a></p>
      <p>Thank you for contributing to our platform!</p>
      <p>Best Regards,<br>Ecommerce Web</p>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
    res.status(200).send({
      process: true,
      message: "Product approved, user notified, product added to the catalog, and notification deleted.",
    });
  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const { notificationId, productId } = req.params; // You need productId as a parameter

    // Fetch the product from PendingProductModel
    const product = await PendingProductModel.findById(productId);
    if (!product) throw new Error("Product not found.");

    // Fetch the user who added the product
    const user = await User.findById(product.addedBy);
    if (!user) throw new Error("User not found.");

    // Delete the notification
    const deleteNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deleteNotification) throw new Error("Notification not found");

    // Prepare the email content for the declined product
    const mailOptions = {
      from: process.env.Email_User, // Sender email
      to: user.email, // Recipient email (user who added the product)
      subject: 'Product Declined: ' + product.title,
      text: `Dear ${user.fname},\n\nWe regret to inform you that your product titled "${product.title}" has been declined and will not be added to our catalog.\n\nFor further information, you can contact us.\n\nBest Regards,\nThe Team`,
      html: `
        <h3>Dear ${user.fname},</h3>
        <p>We regret to inform you that your product titled <strong>"${product.title}"</strong> has been declined and will not be added to our catalog.</p>
        <p>If you have any questions, feel free to <a href="mailto:support@yourwebsite.com">contact us</a>.</p>
        <p>Best Regards,<br>Ecommerce Web</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Email sent");

    res.status(200).send({
      process: true,
      message: "Notification deleted, product declined, and user notified via email.",
    });

  } catch (error) {
    res.status(400).send({
      process: false,
      message: error.message,
    });
  }
};
