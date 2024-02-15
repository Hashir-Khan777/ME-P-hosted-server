import Review from "../model/review.model";
import ReviewDocument from "../interface/review.interface";
import UserDocument from "../interface/auth.interface";
import PartDocument from "../interface/part.interface";

class ReviewService {
    private Review = Review;

    public async addReview(
        user: UserDocument,
        part: PartDocument,
        rating: number,
        review: string
    ): Promise<ReviewDocument> {
        try {
            const Review = await this.Review.create({
                user,
                part,
                rating,
                review
            })
            return Review
        } catch (err) {
            throw err
        }
    }

    public async getAllReviews(): Promise<ReviewDocument[]> {
        try {
            const reviews = await this.Review.find();
            return reviews;
        } catch (err) {
            throw err
        }
    }

    public async getReviewById(id: string): Promise<ReviewDocument | null> {
        try {
            const Review = await this.Review.findById(id);
            return Review;
        } catch (err) {
            throw err
        }
    }
    public async deleteReviewById(id: string): Promise<boolean> {
        try {
            const result = await this.Review.findByIdAndDelete(id);

            // If the result is not null, the Equipment was deleted successfully
            if (result !== null) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    }

}

export default ReviewService