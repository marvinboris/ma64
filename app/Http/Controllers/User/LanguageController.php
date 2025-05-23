<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    private $rules = [
        'name' => 'required|string',
        'abbr' => 'required|string',
        'flag' => 'required|string',
    ];

    private function data()
    {
        $page = +request()->page;
        $show = request()->show;
        $search = request()->search;

        $total = 0;

        $languages = [];
        $filteredData = Language::orderBy('id');

        $filteredData = $filteredData
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('languages.name', 'LIKE', "%$search%")
                        ->orWhere('languages.abbr', 'LIKE', "%$search%")
                        ->orWhere('languages.flag', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $language) {
            $languages[] = $language->toArray();
        }

        return [
            'languages' => $languages,
            'total' => $total,
        ];
    }



    public function index()
    {
        $data = $this->data();

        $languages = $data['languages'];
        $total = $data['total'];

        return response()->json([
            'languages' => $languages,
            'total' => $total,
        ]);
    }

    public function show($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $language = Language::find($id);
        if (!$language) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger'),
        ]);

        return response()->json([
            'language' => $language,
        ]);
    }

    public function store(Request $request)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $request->validate(array_merge($this->rules, [
            'name' => 'required|string|unique:languages',
            'abbr' => 'required|string|unique:languages',
        ]));

        $input = $request->all();

        $cms['pages'][$request->abbr] = $cms['pages'][env('VITE_DEFAULT_LANG')];

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        Language::create($input);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['created'], 'success'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $language = Language::find($id);
        if (!$language) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger'),
        ]);

        $rules = UtilController::rules($this->rules, $language);
        $request->validate($rules);

        $input = $request->all();

        if ($language->abbr !== $request->abbr) {
            $cms['pages'][$request->abbr] = $cms['pages'][$language->abbr];
            unset($cms['pages'][$language->abbr]);
        }

        $language->update($input);

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['updated'], 'success'),
            'language' => $language,
        ]);
    }

    public function destroy($id)
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $language = Language::find($id);
        if (!$language) return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['not_found'], 'danger'),
        ]);

        unset($cms['pages'][$language->abbr]);
        $language->delete();

        $contentText = json_encode($cms);
        file_put_contents(base_path('cms.json'), $contentText);

        $data = $this->data();

        $languages = $data['languages'];
        $total = $data['total'];

        return response()->json([
            'message' => UtilController::message($cms['pages'][$user->language->abbr]['messages']['languages']['deleted'], 'success'),
            'languages' => $languages,
            'total' => $total,
        ]);
    }
}
