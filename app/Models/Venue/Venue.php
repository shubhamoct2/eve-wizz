<?php

namespace App\Models\Venue {


    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use App\Models\Venue\Relations\VenueRelationships;
    use App\Models\Venue\Relations\VenueEvents;

    use App\Models\Auth\User;
    use Modules\Abstracts\Models\Model as ParentModel;
    use Modules\Abstracts\Traits\GenerateUniqueSlugTrait;

    class Venue extends ParentModel
    {
        use GenerateUniqueSlugTrait;
        use HasFactory, VenueRelationships;
        use VenueEvents;



        protected $slugKey = 'name';

        /**
         * Fillable.
         *
         * @var array
         */
        protected $fillable = [
            '_key',
            'user_id',
            'name',
            'slug',
            'description',
            'featured_image',
            'contact',
            'email',
            'address',
            'status',
        ];

        /**
         * Dates.
         *
         * @var array
         */
        protected $dates = [
            'created_at',
            'updated_at',
        ];


        // protected $appends = [
        //     'owner'
        // ];


        protected $casts = [
            'status' => 'boolean'
        ];

        // public function getOwnerAttribute()
        // {
        //     return $this->user();
        // }


        // public function user()
        // {

        //     $this->belongsTo(User::class);
        // }


        public function toArray(): array
        {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'slug' => $this->slug,
                'description' => $this->description,
                'contact' => $this->contact,
                // 'events' => $this->getEvents(),
                'addresses' => $this->address,
                'email' => $this->email,
                'featured_image' => $this->featured_image,
                'status' => $this->status,
            ];
        }
    }
}
