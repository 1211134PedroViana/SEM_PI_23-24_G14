using System;

public class SystemUserId : IEquatable<SystemUserId>
{
    public Guid Value { get; }

    public SystemUserId(Guid id)
    {
        // Adicione lógica de validação, se necessário
        Value = id;
    }

    public static SystemUserId Create(Guid id)
    {
        // Lógica de validação pode ser adicionada aqui, se necessário
        return new SystemUserId(id);
    }

    public override bool Equals(object obj)
    {
        return Equals(obj as SystemUserId);
    }

    public bool Equals(SystemUserId other)
    {
        return other != null && Value == other.Value;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Value);
    }
}
using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.SystemUsers
{
    public class SystemUserId : EntityId
    {
        [JsonConstructor]
        public SystemUserId(Guid value) : base(value)
        {
        }

        public SystemUserId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}
