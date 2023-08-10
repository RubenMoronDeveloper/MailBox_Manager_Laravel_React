<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vecino;
use Illuminate\Http\Request;
use DB;

class VecinoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vecinos = Vecino::all();
        return $vecinos;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $vecino = new Vecino();
        $vecino->nombre = $request->nombre;
        $vecino->apellido = $request->apellido;
        $vecino->piso = $request->piso;
        $vecino->email = $request->email;
        $vecino->password = $request->password;
        $vecino->save();
    }
    public function login(Request $request){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $result = DB::table('vecinos')
        ->where('vecinos.email','=',$email)
        ->select('vecinos.email' , 'vecinos.password')
        ->get();
        return $result;
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $vecino =  Vecino::find($id);
        return $vecino;
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $vecino = Vecino::findOrFail($request->id);
        $vecino->nombre = $request->nombre;
        $vecino->apellido = $request->apellido;
        $vecino->piso = $request->piso;
        $vecino->email = $request->email;
        $vecino->password = $request->password;

        $vecino->save();
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vecino = Vecino::destroy($id);
        return $vecino;
    }
    /**
     * Inner Join vecino->messages
     */
    public function innerJoin(string $id){
        $result = DB::table('vecinos')
        ->join('cartas','cartas.id_piso','=','vecinos.id')
        ->where('vecinos.id','=',$id)
        ->select('vecinos.nombre','cartas.id','cartas.remitente','cartas.contenido','cartas.id_piso')
        ->get();
        return $result;
    }
}
