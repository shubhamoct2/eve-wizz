"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useRef, useEffect } from "react";
import TemplatePreview from "@/app/(on-boarding)/on-boarding/boarding-steps/template-preview";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import defaultEventValues from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event/defaultValues";
import eventMainSchema from "@/app/(on-boarding)/on-boarding/boarding-steps/step-event/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Error from "@/components/notifications/error";

import EventService from "@/services/venue/event.service";

import EventCategoryDropDown from "./event-categories";
const defaultErrors = defaultEventValues;
import useFilePreview from "@/hooks/use-file-preview";
import GalleryPreview from "./gallery-preview"

export default function StepTwoEvent() {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(defaultErrors);
  const [categories, setCategories] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  // ** Hooks
  const {
    reset: venueReset,
    control: eventControl,
    handleSubmit: handleEventSubmit,
    formState: { errors: eventErrors },
    watch
  } = useForm({
    defaultValues: defaultEventValues,
    resolver: zodResolver(eventMainSchema),
  });

  //categories options
  useEffect(() => {
    EventService.getEventCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        setCategories([]);
      });
  }, []);

  console.log(eventErrors, " eventErrorseventErrorseventErrors");

  // handle submit event
  const onSubmit = (data) => {
    console.log(data, " submit");
  };

  const UPLOAD_IMAGE_STYLE =
    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600";


  const handleStringToInt=(event)=>{
      console.log(event,'CHANGED')
  }
  
  const setBannerImage=(e)=>{
      const newUrl = URL.createObjectURL(e.target.files?.[0]);
      if (newUrl !== imgSrc) {
          setImgSrc(newUrl);
        }
      setSelectedImage(
          e.target.files?.[0] || null
        );
  }
  
  const [gallery,setGallery]=useState([]);
  const setGalleryImages=(e)=>{
      const files = e?.target?.files
      let tempFiles = [];
Object.entries(files).map(([index,file])=>{
    const newUrl = URL.createObjectURL(file);
    tempFiles.push(newUrl);
})
setGallery(tempFiles)

//      if(e?.target?.files){
//          e?.target?.files.forEach((image)=>{
//              console.log(image,' Gallery Image')
//          })
//      }
  }
  return (
    <>
      <section className="steps-counter h-screen w-full">
        <section className="step-1 flex w-full justify-between">
          <aside className="w-4/12">
            <section className="w-full form-wrapper bg-white rounded">
              <section className="w-full p-4">
                <h2 className="text-4xl my-4">
                  OK! Let's Help You Create Your First Event
                </h2>
              </section>
              <form
                onSubmit={handleEventSubmit(onSubmit)}
                className="w-full p-4"
              >
                <section className={"w-full"}>
                  <article className="title mt-8 mb-4">
                    <label htmllFor="" className="form-label">Event Category</label>
                  </article>
                  <Controller
                    name="eventCategory"
                    control={eventControl}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <>
                        <Select
                            id={"eventCategory"}
//                          onValueChange={field.onChange}
                          onValueChange={handleStringToInt}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              m@example.com
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              m@google.com
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              m@support.com
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  />
                  {eventErrors?.eventCategory && (
                    <Error message={eventErrors?.eventCategory.message} />
                  )}
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <label htmlFor="bannerFile" className="form-label">Header Banner Image</label>
                  </article>
                  <article className={"flex w-full px-4"}>
                    <div className="grid w-full items-center  gap-1.5">
                      <Controller
                        name="banner"
                        control={eventControl}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <>
                            <div className="flex items-center justify-center w-full">
                              <label
                                htmlFor="bannerFile"
                                className={
                                  eventErrors?.banner
                                    ? `${UPLOAD_IMAGE_STYLE} border-red-500`
                                    : UPLOAD_IMAGE_STYLE
                                }
                              >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                  <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </div>
                                <Input
                                  type="file"
                                  className="hidden"
                                  id="bannerFile"
                                  onBlur={field.onBlur}
                                  name={field.name}
                                  onChange={(e) => {
                                    field.onChange(e.target.files);
                                    setBannerImage(e)
                                  }}
                                  ref={field.ref}
                                />
                              </label>
                            </div>
                          </>
                        )}
                      />
                      
                      {imgSrc ? (
                          <section className="h-40 w-full p-4 border-2 border-gray-300 border-dashed rounded-lg">
                              <img className="object-cover object-center h-full w-full max-w-full rounded-lg" src={imgSrc} alt="preview" />
                          </section>
                      ) : null}
                      
                      {eventErrors?.banner && (
                        <Error message={eventErrors?.banner.message} />
                      )}
                    </div>
                  </article>
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <label htmlFor="bannerHeading" className="form-label">Add Banner Heading</label>
                  </article>
                  <article className={"w-full"}>
                    <Controller
                      name="bannerHeading"
                      control={eventControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <>
                          <Input
                              id={"bannerHeading"}
                            className={
                              eventErrors.name
                                ? "text-red-500 border-red-500"
                                : ""
                            }
                            value={value}
                            onChange={onChange}
                            placeholder="e.g. Christmas Party"
                            aria-describedby="venue-event-banner-heading"
                          />
                        </>
                      )}
                    />
                    {eventErrors?.bannerHeading && (
                      <Error message={eventErrors?.bannerHeading.message} />
                    )}
                  </article>
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                  </article>
                  <article className={"w-full"}>
                    <Controller
                      name="title"
                      control={eventControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Input
                            id={"title"}
                          className={
                            eventErrors.title
                              ? "text-red-500 border-red-500"
                              : ""
                          }
                          value={value}
                          onChange={onChange}
                          placeholder="e.g. Christmas Party"
                          aria-describedby="venue-event-title"
                        />
                      )}
                    />
                    {eventErrors?.title && (
                      <Error message={eventErrors?.title?.message} />
                    )}
                  </article>
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <label htmlFor="subTitle" className="form-label">Sub Title</label>
                  </article>
                  <article className={"w-full"}>
                    <Controller
                      name="subTitle"
                      control={eventControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Input
                            id={"subTitle"}
                          className={
                            eventErrors.subTitle
                              ? "text-red-500 border-red-500"
                              : ""
                          }
                          value={value}
                          onChange={onChange}
                          placeholder="e.g. All-Inclusive Christmas Party Nights"
                          aria-describedby="venue-event-sub-title"
                        />
                      )}
                    />
                    {eventErrors?.subTitle && (
                      <Error message={eventErrors?.subTitle.message} />
                    )}
                  </article>
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <h4 className="form-label">Description</h4>
                  </article>
                  <article className={"w-full"}>
                    <Controller
                      name="description"
                      control={eventControl}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Textarea
                          value={value}
                          onChange={onChange}
                          className={
                            eventErrors.subTitle
                              ? "text-red-500 border-red-500"
                              : ""
                          }
                          placeholder="Description..."
                          aria-describedby="venue-event-description"
                        />
                      )}
                    />
                    {eventErrors.description &&
                      eventErrors.description?.message && (
                        <Error message={eventErrors?.description.message} />
                      )}
                  </article>
                </section>

                <section className="w-full">
                  <article className="title mt-8 mb-4">
                    <h4 className="form-label">Add Gallery Images</h4>
                  </article>
                  <article className={"flex w-full px-4"}>

                      
                      
                      <div className="grid w-full items-center  gap-1.5">
                          <Controller
                            name="gallery"
                            control={eventControl}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="galleryFile"
                                            className={
                                                eventErrors?.gallery
                                                    ? `${UPLOAD_IMAGE_STYLE} border-red-500`
                                                    : UPLOAD_IMAGE_STYLE
                                            }
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">
                                                        Click to upload
                                                    </span>{" "}
                                                    or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                </p>
                                            </div>
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id="galleryFile"
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                multiple={true}
                                                onChange={(e) => {
                                                    field.onChange(e.target.files);
                                                    setGalleryImages(e)
                                                }}
                                                ref={field.ref}
                                            />
                                        </label>
                                    </div>
                                </>
                            )}
                        />
                        
              
                        <GalleryPreview gallery={gallery}/>
                        
                        {eventErrors?.gallery && (
                            <Error message={eventErrors?.gallery.message} />
                        )}
                    </div>
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                  </article>
                </section>
                <section className="w-full">
                  <article
                    className={"flex w-full px-4 my-4 space-x-4 justify-end"}
                  >
                    <section className={"w-1/2 space-x-4 flex justify-end"}>
                      <Button>Save</Button>
                      <Button type={"submit"}>Next</Button>
                    </section>
                  </article>
                </section>
              </form>
            </section>
          </aside>
          <section className="w-8/12 px-8">
            <TemplatePreview />
          </section>
        </section>
      </section>
    </>
  );
}
