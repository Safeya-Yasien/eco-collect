<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

class BaseController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;

    public function sendResponse($data, string $message = 'Success', int $status = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $status);
    }

    public function sendError(string $message, array $errors = null, int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    public function handleException(\Exception $exception): JsonResponse
    {
        Log::error('Exception occurred: ' . $exception->getMessage(), [
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ]);

        return $this->sendError(
            'حدث خطأ ما. برجاء المحاولة لاحقًا.',
            config('app.debug') ? ['exception' => $exception->getMessage()] : null,
            500
        );
    }

    public function handleValidationErrors(ValidationException $exception): JsonResponse
    {
        return $this->sendError('حدثت أخطاء في التحقق من البيانات.', $exception->errors(), 422);
    }
}
