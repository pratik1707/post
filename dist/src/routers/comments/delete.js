"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentRouter = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("../../models/post"));
const comment_1 = __importDefault(require("../../models/comment"));
const router = (0, express_1.Router)();
exports.deleteCommentRouter = router;
router.delete('/api/comment/:commentId/delete/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commentId } = req.params;
    if (!commentId || !postId) {
        const error = new Error("post and comment id are both required");
        error.status = 400;
        next(error);
    }
    try {
        yield comment_1.default.findOneAndDelete({ _id: commentId });
    }
    catch (err) {
        const error = new Error('Comment cannot be deleted!');
        error.status = 400;
        next(error);
    }
    const updatedPost = yield post_1.default.findOneAndUpdate({ _id: postId }, { $pull: { comments: commentId } }, { new: true });
    res.status(200).json({ success: true });
}));
