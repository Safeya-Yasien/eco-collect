<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class emailverfivationnotification extends Notification
{
    use Queueable;
    protected $url;

    /**
     * Create a new notification instance.
     */
    public function __construct( string $url)
    {
        $this->url = $url;
    }


    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Verify Email Address')
                    ->line(' Dear ' . $notifiable->name)
                    ->line("Thank you for signing up for our application! We’re excited to have you on board and look forward to providing you with the best experience.")
                    ->action(' Verify Email', $this->url)
                    ->line(' if you did not create an account , no further action is required from you!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
