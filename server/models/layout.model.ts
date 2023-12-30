import { Document, Schema, model } from 'mongoose';

interface FqaItem extends Document {
    question: string;
    answer: string;
}

interface Category extends Document {
    title: string;
}

interface BannerImage extends Document {
    public_id: string;
    url: string;
}

interface Layout extends Document {
    type: string;
    faq: FqaItem[];
    categories: Category[];
    banner: {
        image: BannerImage;
        title: string;
        subtitle: string;
    };
}

const faqSchema = new Schema<FqaItem>({
    question: {
        type: String
    },
    answer: {
        type: String
    }
});

const categorySchema = new Schema<Category>({
    title: {
        type: String
    }
});

const bannerImageSchema = new Schema<BannerImage>({
    public_id: {
        type: String
    },
    url: {
        type: String
    }
});

const layoutSchema = new Schema<Layout>({
    type: {
        type: String
    },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: bannerImageSchema,
        title: {
            type: String
        },
        subtitle: {
            type: String
        }
    }
});

const LayoutModel = model<Layout>('Layout', layoutSchema);

export default LayoutModel;