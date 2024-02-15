import Equipment from '../model/equipment.model';
import EquipmentDocument from '../interface/equipment.interface';
import CategoryDocument from 'interface/category.interface';
import HttpException from '../utils/http.exception';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/equipment');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

class EquipmentService {
    private Equipment = Equipment;

    public async createEquipment(
        equipment_name: string,
        model: string,
        year: number,
        make: string,
        category: string,
        location: string,
        description: string,
        sku: string,
        condition: 'used' | 'new',
        price: number,
        images: string[]
    ): Promise<EquipmentDocument> {
        console.log(condition, description, 'condition, description');
        try {
            const dup = await this.Equipment.findOne({
                equipment_name: equipment_name,
            });
            if (dup) {
                throw new HttpException(
                    409,
                    'Already a equipment by this name'
                );
            }
            const Equipment = await this.Equipment.create({
                equipment_name,
                model,
                year,
                make,
                category,
                location,
                sku,
                condition,
                price,
                description,
                images,
            });
            return Equipment;
        } catch (err) {
            throw err;
        }
    }

    public async getAllEquipments(): Promise<EquipmentDocument[]> {
        try {
            const categories = await this.Equipment.find();
            return categories;
        } catch (err) {
            throw err;
        }
    }

    public async getEquipmentById(
        id: string
    ): Promise<EquipmentDocument | null> {
        try {
            const Equipment = await this.Equipment.findById(id);
            return Equipment;
        } catch (err) {
            throw err;
        }
    }

    public async deleteEquipmentById(id: string): Promise<boolean> {
        try {
            const result = await this.Equipment.findByIdAndDelete(id);

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

export default EquipmentService;
