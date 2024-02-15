import Category from "../model/category.model";
import CategoryDocument from "../interface/category.interface";

class CategoryService {
    private category = Category;

    public async createCategory(
        category_name : string,
        slug: string,
        description: string
    ): Promise<CategoryDocument> {
        try{

            const category = await this.category.create({
                category_name, slug, description
            });
            return category;
        } catch (err) {
            throw err;
        }
    }

    public async getAllCategories(): Promise<CategoryDocument[]> {
        try {
            const categories = await this.category.find();
            return categories;
        } catch (err) {
            throw err;
        }
    }

    public async getCategoryById(id: string): Promise<CategoryDocument | null> {
        try {
            const category = await this.category.findById(id);
            return category;
        } catch (err) {
            throw err;
        }
    }

    public async deleteCategoryById(id: string): Promise<boolean> {
        try {
            const result = await this.category.findByIdAndDelete(id);
            
            // If the result is not null, the category was deleted successfully
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

export default CategoryService;