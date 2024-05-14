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
      return ($venue);
      return [
        'name' => $venue->name,
        'slug' => $venue->slug,
        'description' => $venue->description,
        'contact' => $venue->contact,
        'email' => $venue->email,
        'featured_image' => $venue->featured_image,
        'address' => $venue->address,
      ];
    }
  }
}
