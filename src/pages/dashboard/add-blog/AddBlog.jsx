// components/AddBlog.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Image as ImageIcon, X } from "lucide-react";

export default function AddBlog() {
  const [blog,setBlog]=useState({heading:"", description:"", image: null, pdfFile: null})
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setBlog({...blog, image:file})
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle PDF Upload
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setBlog({...blog, pdfFile: file})
      setPdfFile(file);
    }
  };

  // Remove Image
  const removeImage = () => {
    setImage(null);
     setBlog({...blog, image: null})
    setImagePreview(null);
  };

  // Remove PDF
  const removePdf = () => {
      setBlog({...blog, pdfFile: null})
    setPdfFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!heading || !description || !image || !pdfFile) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("demo", description);
    formData.append("image", image);
    formData.append("pdf", pdfFile);

    const formData22=new FormData();
    formData22.append("heading", blog.heading)
    formData22.append("demo", blog.description)
    formData22.append("image", blog.image)
    formData22.append("pdfFile", blog.pdfFile)

    console.log("Blog Data:", Object.fromEntries(formData));
    console.log("BlogState Data:", Object.fromEntries(formData22));
    // Send formData to your API here
    alert("Blog submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Blog</CardTitle>
            <CardDescription>
              Fill in the details to publish a new blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Blog Heading */}
              <div className="space-y-2">
                <Label htmlFor="heading">Blog Heading</Label>
                <Input
                  id="heading"
                  placeholder="Enter an engaging title..."
                  value={heading}
                  onChange={(e) =>{ setHeading(e.target.value); setBlog({...blog, heading:e.target.value})}}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write your blog content here..."
                  rows={8}
                  value={description}
                  onChange={(e) => {setDescription(e.target.value); setBlog({...blog, description:e.target.value})}}
                  required
                  className="resize-none"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Blog Cover Image</Label>
                <div className="grid gap-4">
                  {!imagePreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-12 h-12 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Upload */}
              <div className="space-y-2">
                <Label>PDF Document (Optional)</Label>
                {!pdfFile ? (
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-10 h-10 text-red-600" />
                      <div className="text-left">
                        <p className="text-sm font-medium">Click to upload PDF</p>
                        <p className="text-xs text-gray-500">Max size: 50MB</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handlePdfChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-10 h-10 text-red-600" />
                      <div>
                        <p className="font-medium text-green-800 dark:text-green-300">
                          {pdfFile.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full">
                <Upload className="mr-2 h-5 w-5" />
                Publish Blog
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}