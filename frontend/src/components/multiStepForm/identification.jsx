import React, { useEffect } from "react";
import { Button, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";

const Identification = ({
  prevStep,
  nextStep,
  isLoading,
  data,
  setData,
  resErrors,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const saveData = (data) => {
    setData({ ...data });
    isPreviousClick ? prevStep() : nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Identification Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Document Id:
                </label>
                <Controller
                  name="identification.documentId"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="2050"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.identification?.documentId?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
              Document:
            </label>
            <Controller
              name="identification.document"
              control={control}
              rules={{
                required: !isPreviousClick,
              }}
              render={({ field }) => (
                <Upload {...field}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              )}
            />
            {errors?.identification?.document?.type === "required" && (
              <p className="text-sm text-red">Required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
              Birth Certificate:
            </label>
            <Controller
              name="identification.birthCertificate"
              control={control}
              render={({ field }) => (
                <Upload {...field}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-start-1 col-span-2 justify-center items-center  rounded-ful">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(true);
              }}
              type="back"
              className="flex col-start-1 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              <ImArrowLeft2 /> Prev
            </button>
          )}
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-centertext-white rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(false);
              }}
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Identification;
