import { Col } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { ImagePlus } from "lucide-react";


const UUpload = ({
  onChange,
  name = "file",
  listType = "picture",
  disabled = false,
  colSpanLg,
  colSpanMd,
  multiple = false,
  description,
  defaultFileList = [],
}) => {
  return (
    <Col
      span={24}
      lg={{ span: colSpanLg }}
      md={{ span: colSpanMd }}
      className="mx-auto w-full"
    >
      <div>
        <div className="mt-1  rounded-lg">
          <Dragger
            defaultFileList={defaultFileList}
            className="!border-none"
            multiple={multiple}
            accept=".jpg,.jpeg,.png,.gif,.webp"
            id={name}
            disabled={disabled}
            onChange={onChange}
            name={name}
            listType={listType}
          >
            <div className="flex items-center gap-3 justify-center ">
            <p className="ant-upload-drag-icon text-white !mb-0">
              <ImagePlus size={30} />
            </p>
            <p className=" text-white text-xl font-medium">Upload Category Image</p>
            </div>
            
          </Dragger>
        </div>
      </div>
    </Col>
  );
};

export default UUpload;