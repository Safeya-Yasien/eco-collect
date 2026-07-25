<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileCollectorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'business_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:waste_collectors,email,' . $this->user()->id,
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'waste_types' => 'nullable|array|min:1',
            'waste_types.*' => 'required|string|in:cardboard,glass,metal,plastic',
            'rating' => 'nullable|numeric|min:0|max:5',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ];
    }

    public function messages()
    {
        return [
            'name.string' => 'حقل الاسم يجب أن يكون نصاً',
            'business_name.string' => 'حقل اسم العمل يجب أن يكون نصاً',
            'email.email' => 'يجب إدخال بريد إلكتروني صحيح',
            'email.unique' => 'البريد الإلكتروني مستخدم بالفعل',
            'phone.string' => 'حقل الهاتف يجب أن يكون نصاً',
            'location.string' => 'حقل الموقع يجب أن يكون نصاً',
            'logo.image' => 'الملف يجب أن يكون صورة',
            'logo.max' => 'حجم الصورة لا يجب أن يتجاوز 2 ميجابايت',
            'waste_types.array' => 'أنواع النفايات يجب أن تكون مصفوفة',
            'waste_types.min' => 'يجب اختيار نوع واحد على الأقل من النفايات',
            'waste_types.*.in' => 'نوع النفايات غير صحيح. الأنواع المتاحة: كارتون، زجاج، معدن، بلاستيك',
            'rating.numeric' => 'التقييم يجب أن يكون رقماً',
            'rating.min' => 'التقييم يجب أن يكون بين 0 و 5',
            'rating.max' => 'التقييم يجب أن يكون بين 0 و 5',
            'latitude.numeric' => 'خط العرض يجب أن يكون رقماً',
            'latitude.between' => 'خط العرض يجب أن يكون بين -90 و 90',
            'longitude.numeric' => 'خط الطول يجب أن يكون رقماً',
            'longitude.between' => 'خط الطول يجب أن يكون بين -180 و 180',
        ];
    }
}
