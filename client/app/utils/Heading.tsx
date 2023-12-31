import React, {FC} from "react";

interface HeadProps {
    title: string;
    description: string;
    keywords: string;
}

const Heading: FC<HeadProps> = ({title, description, keywords}) => {
    return (
        <>
            <title>{title}</title>
            <meta name="viewport" content="with=device-width, initial-scale=1"></meta>
            <meta>{description}</meta>
            <meta>{keywords}</meta>
        </>
    );
};

export default Heading;