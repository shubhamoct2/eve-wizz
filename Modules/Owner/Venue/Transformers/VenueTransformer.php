<?php

namespace Modules\Owner\Venue\Transformers {
    use League\Fractal\Resource\Collection;
    use Modules\Abstracts\Transformers\Transformer as AbstractTransformer;
    use App\Models\Venue\Venue;

    class VenueTransformer extends AbstractTransformer
    {
        protected array $defaultIncludes = [];

        public function transform($venue)
        {
            return $venue;
            return [
                "use_id" => $venue->user_id,
                "name" => $venue->name,
                "slug" => $venue->slug,
                "description" => $venue->description,
                "phone" => $venue->contact,
                "email" => $venue->email,
                "featured_image" => $venue->featured_image,
                "address" => $venue->address,
            ];
        }

        public function toArray($venue)
        {
            $venue= collect($venue)->first();
            dd($venue);
            return [
                            "use_id" => $venue->user_id,
                            "name" => $venue->name,
                            "slug" => $venue->slug,
                            "description" => $venue->description,
                            "phone" => $venue->contact,
                            "email" => $venue->email,
                            "featured_image" => $venue->featured_image,
                            "address" => $venue->address,
            ];
        }
    }
}
