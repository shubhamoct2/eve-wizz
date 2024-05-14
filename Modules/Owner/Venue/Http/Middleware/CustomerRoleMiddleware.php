<?php


namespace Modules\Owner\Venue\Http\Middleware{
    use Closure;
    use Illuminate\Http\Request;
class CustomerRoleMiddleware {


 public function handle(Request $request, Closure $next): Response{

if(!request()->user && !request()->user()->isOwner){
return response()->json([
    'status' =>

]);
}

}
}


}
