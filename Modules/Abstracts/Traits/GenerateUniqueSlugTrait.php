<?php

namespace Modules\Abstracts\Traits {

    use Illuminate\Support\Str;

    trait GenerateUniqueSlugTrait
    {
        public static function bootGenerateUniqueSlugTrait(): void
        {
            static::saving(function ($model) {

                if (null == $model->slug) {
                    $model->slug = Str::slug($model[$model->slugKey]);
                }
                if (static::whereSlug($slug = Str::slug($model->slug))->exists()) {
                    $randomString = Str::uuid();
                    $model->slug = "{$slug}-{$randomString}";
                }


                // update-_key-attribute uuid()
                if (null == $model->_key) {
                    $model->_key = (string) Str::uuid();
                }
            });
        }
    }
}
