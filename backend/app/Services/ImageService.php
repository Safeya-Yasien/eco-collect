<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageService
{
    /**
     * Upload and optimize image
     *
     * @param UploadedFile $image
     * @param string $path
     * @return string
     */
    public function uploadImage(UploadedFile $image, string $path): string
    {
        // Generate unique filename
        $filename = uniqid() . '_' . time() . '.' . $image->getClientOriginalExtension();
        
        // Create image instance
        $img = Image::make($image);
        
        // Optimize image
        $img->resize(800, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        
        // Save optimized image
        $img->save(storage_path('app/public/' . $path . '/' . $filename), 80);
        
        return $path . '/' . $filename;
    }

    /**
     * Delete image from storage
     *
     * @param string $path
     * @return bool
     */
    public function deleteImage(string $path): bool
    {
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        
        return false;
    }
} 