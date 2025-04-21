<?php

use App\Http\Controllers\ExportController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\Method\CinetpayController;
use App\Http\Controllers\Method\MonetbilController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\BrandController;
use App\Http\Controllers\User\CMS\AuthController as CMSAuthController;
use App\Http\Controllers\User\CMS\BackendController;
use App\Http\Controllers\User\CMS\ComponentsController;
use App\Http\Controllers\User\CMS\FrontendController as CMSFrontendController;
use App\Http\Controllers\User\CMS\GeneralController;
use App\Http\Controllers\User\CMS\GlobalController;
use App\Http\Controllers\User\CMS\MessagesController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\FeatureController;
use App\Http\Controllers\User\LanguageController;
use App\Http\Controllers\User\MethodController;
use App\Http\Controllers\User\PostCategoryController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\RoleController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\UtilController;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('User')->prefix('user')->name('user.')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('forgot', [AuthController::class, 'forgot'])->name('forgot');
    Route::post('reset/{id}/{code}', [AuthController::class, 'reset'])->name('reset');

    Route::middleware('auth:api')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::middleware('permission')->group(function () {
            Route::name('cms.')->prefix('cms')->namespace('CMS')->group(function () {
                Route::patch('global', [GlobalController::class, 'patch'])->name('global');
                Route::patch('general', [GeneralController::class, 'patch'])->name('general');
                Route::patch('components', [ComponentsController::class, 'patch'])->name('components');
                Route::patch('messages', [MessagesController::class, 'patch'])->name('messages');
                Route::patch('frontend', [CMSFrontendController::class, 'patch'])->name('frontend');
                Route::patch('backend', [BackendController::class, 'patch'])->name('backend');
                Route::patch('auth', [CMSAuthController::class, 'patch'])->name('auth');

                Route::name('index')->get('', function () {
                    $jsonString = file_get_contents(base_path('cms.json'));
                    $cms = json_decode($jsonString, true);

                    return response()->json([
                        'cms' => $cms,
                        'languages' => Language::all(),
                    ]);
                });
            });

            Route::prefix('features')->name('features.')->group(function () {
                Route::get('{feature}', [FeatureController::class, 'show'])->name('show');
            });

            Route::prefix('languages')->name('languages.')->group(function () {
                Route::get('{language}', [LanguageController::class, 'show'])->name('show');
            });

            Route::prefix('roles')->name('roles.')->group(function () {
                Route::get('info', 'RoleController@info')->name('info');
                Route::get('{role}', [RoleController::class, 'show'])->name('show');
            });

            Route::prefix('users')->name('users.')->group(function () {
                Route::get('info', 'UserController@info')->name('info');
                Route::get('{user}', [UserController::class, 'show'])->name('show');
            });

            Route::prefix('methods')->name('methods.')->group(function () {
                Route::get('info', 'MethodController@info')->name('info');
                Route::get('{method}', [MethodController::class, 'show'])->name('show');
            });



            Route::prefix('post-categories')->name('post_categories.')->group(function () {
                Route::get('{post_category}', 'PostCategoryController@show')->name('show');
            });

            Route::prefix('posts')->name('posts.')->group(function () {
                Route::get('info', 'PostController@info')->name('info');
                Route::get('{post}', 'PostController@show')->name('show');
            });

            Route::prefix('brands')->name('brands.')->group(function () {
                Route::get('{brand}', 'BrandController@show')->name('show');
            });

            Route::prefix('products')->name('products.')->group(function () {
                Route::get('info', 'ProductController@info')->name('info');
                Route::get('{product}', 'ProductController@show')->name('show');
            });



            Route::apiResources([
                'users' => UserController::class,
                'roles' => RoleController::class,
                'features' => FeatureController::class,
                'languages' => LanguageController::class,
                'methods' => MethodController::class,

                'post-categories' => PostCategoryController::class,
                'posts' => PostController::class,
                'brands' => BrandController::class,
                'products' => ProductController::class,
            ]);
        });
    });
});

Route::name('frontend.')->group(function () {
    Route::get('home', [FrontendController::class, 'home'])->name('home');

    Route::prefix('post-categories/{post_category}')->name('post_categories.')->group(function () {
        Route::prefix('posts')->name('posts.')->group(function () {
            Route::get('{post}', [FrontendController::class, 'post'])->name('show');
            Route::get('', [FrontendController::class, 'posts'])->name('index');
        });
    });

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('{post}', [FrontendController::class, 'post'])->name('show');
        Route::get('', [FrontendController::class, 'posts'])->name('index');
    });

    Route::prefix('products')->name('products.')->group(function () {
        Route::get('{product}', [FrontendController::class, 'product'])->name('show');
        Route::get('', [FrontendController::class, 'products'])->name('index');
    });
});

Route::middleware('auth:admin,restaurant,api')->group(function () {
    Route::get('logout', [UtilController::class, 'logout'])->name('logout');
    Route::get('user', [UtilController::class, 'user'])->name('user');

    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('{notification}', [UtilController::class, 'notification'])->name('show');
        Route::get('', [UtilController::class, 'notifications'])->name('index');
    });

    Route::name('export.')->prefix('export')->group(function () {
        Route::name('xlsx')->post('xlsx', [ExportController::class, 'xlsx']);
        Route::name('csv')->post('csv', [ExportController::class, 'csv']);
        Route::name('pdf')->post('pdf', [ExportController::class, 'pdf']);
    });

    Route::prefix('content')->name('content.')->group(function () {
        Route::get('language/{language}', function ($id) {
            $user = UtilController::get(request());

            $jsonString = file_get_contents(base_path('cms.json'));
            $cmsFile = json_decode($jsonString, true);

            $language = Language::find($id);
            if (!$language) return response()->json([
                'message' => UtilController::message($cmsFile['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger')
            ]);

            $user->update([
                'language_id' => $id
            ]);

            $cms = [
                'global' => $cmsFile['global'],
                'pages' => $cmsFile['pages'][$language->abbr],
            ];

            return response()->json([
                'language' => $language->toArray(),
                'cms' => $cms,
            ]);
        })->name('language');
    });
});

Route::prefix('content')->name('content.')->group(function () {
    Route::get('{language}', function ($lang) {
        $jsonString = file_get_contents(base_path('cms.json'));
        $cmsFile = json_decode($jsonString, true);

        $abbr = $lang;
        if (Language::whereAbbr($lang)->count() === 0) $abbr = env('VITE_DEFAULT_LANG', 'en');

        $cms = [
            'global' => $cmsFile['global'],
            'pages' => $cmsFile['pages'][$abbr],
        ];
        $languages = Language::all();

        return response()->json([
            'cms' => $cms,
            'languages' => $languages,
        ]);
    })->name('cms');
});

Route::namespace('Method')->group(function () {
    Route::get('monetbil/notify', [MonetbilController::class, 'notify'])->name('monetbil.notify.get');
    Route::post('monetbil/notify', [MonetbilController::class, 'notify'])->name('monetbil.notify.post');

    Route::get('cinetpay/notify', [CinetpayController::class, 'notify'])->name('cinetpay.notify.get');
    Route::post('cinetpay/notify', [CinetpayController::class, 'notify'])->name('cinetpay.notify.post');
});
